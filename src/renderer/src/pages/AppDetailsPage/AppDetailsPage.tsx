import { JSX } from 'react'
import { useChainId, useReadContract } from 'wagmi'
import { useParams } from 'react-router-dom'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { useTranslation } from 'react-i18next'
import { formatUnits } from 'viem'

export function AppDetailsPage(): JSX.Element {
  const { t } = useTranslation()
  const { appId } = useParams()
  const chainId = useChainId()
  const { data } = useReadContract({
    address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
    abi: chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
    functionName: 'impactApps',
    args: [appId]
  })

  console.log(data)

  const appData = data as string[]
  if (!appData) {
    return (
      <ScreenPage pageTitle={t('appDetails')}>
        <div />
      </ScreenPage>
    )
  }

  return (
    <ScreenPage pageTitle={t('appDetails')}>
      <div className="flex gap-5 mt-5">
        <img src={appData[4]} className="w-[200px] h-[200px] rounded-2xl object-cover" />
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-white text-4xl">{appData[2]}</h1>
          <p className="text-white">{appData[3]}</p>
          <p className="text-gray-400">{appData[1]}</p>

          <div className="flex gap-5 mt-3">
            <div className="w-[150px] h-16 rounded-2xl flex flex-col items-center justify-center bg-red-400">
              <p className="font-bold text-white text-xl">{formatUnits(BigInt(appData[7]), 0)}</p>
              <p className="text-white">{t('votesDown')}</p>
            </div>

            <div className="w-[150px] h-16 rounded-2xl flex flex-col items-center justify-center bg-green-500">
              <p className="font-bold text-white text-xl">{formatUnits(BigInt(appData[8]), 0)}</p>
              <p className="text-white">{t('votesUp')}</p>
            </div>
          </div>
        </div>
      </div>
    </ScreenPage>
  )
}
