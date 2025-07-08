import { JSX, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useBalance } from 'wagmi'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'
import { format, isToday } from 'date-fns'

import ImageCoin from '@renderer/assets/images/icon-chain.png'

export function Balance(): JSX.Element {
  const { t } = useTranslation()
  const [viewBalance, setViewBalance] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const { address } = useAccount()
  const { data, refetch, isLoading } = useBalance({ address })

  function toggleViewBalance(): void {
    setViewBalance((value) => !value)
  }

  const balance = data ? parseFloat(data.formatted) : 0

  async function handleRefreshBalance(): Promise<void> {
    await refetch()
    setLastUpdate(new Date())
  }

  return (
    <div>
      <div className="flex flex-col w-[400px] rounded-2xl p-5 bg-card-2">
        <p className="text-gray-300 text-sm">{t('balance')}</p>

        <div className="flex items-center gap-2 my-5">
          <img src={ImageCoin} className="w-10 h-10 object-contain" />
          <p className="font-bold text-white text-xl">SINTROP</p>
        </div>

        <div className="flex items-center gap-5">
          <p className="font-bold text-white text-lg">
            {viewBalance ? (
              <>
                {balance &&
                  Intl.NumberFormat('pt-BR', { maximumFractionDigits: 5 }).format(balance)}
              </>
            ) : (
              '**********'
            )}
          </p>

          <button onClick={toggleViewBalance} className="hover:cursor-pointer">
            {viewBalance ? (
              <FaRegEye color="white" size={25} />
            ) : (
              <FaEyeSlash color="white" size={25} />
            )}
          </button>
        </div>

        <div className="flex w-full justify-end items-center gap-3">
          <p className="text-gray-300 text-xs">
            {t('lastUpdate')}: {isToday(lastUpdate) ? t('today') : format(lastUpdate, 'dd/MM/yyyy')}{' '}
            {format(lastUpdate, 'kk:mm')}
          </p>

          <button
            className="flex hover:cursor-pointer disabled:cursor-default"
            onClick={handleRefreshBalance}
            disabled={isLoading}
          >
            <MdRefresh color="white" size={25} className={`${isLoading && 'animate-spin'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
