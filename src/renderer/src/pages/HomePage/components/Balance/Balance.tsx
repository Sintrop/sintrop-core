import { JSX, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useBalance } from 'wagmi'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'

import ImageCoin from '@renderer/assets/images/icon-chain.png'

export function Balance(): JSX.Element {
  const { t } = useTranslation()
  const [viewBalance, setViewBalance] = useState(false)
  const { address } = useAccount()
  const { data } = useBalance({ address })

  function toggleViewBalance(): void {
    setViewBalance((value) => !value)
  }

  const balance = data ? parseFloat(data.formatted) : 0

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

        {/* <p className="text-gray-300 text-xs mt-5">
          {t('lastUpdate')}: {t('today')} {format(new Date(), 'kk:mm')}
        </p> */}
      </div>
    </div>
  )
}
