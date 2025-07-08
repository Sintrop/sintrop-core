import { JSX, useState } from 'react'
import { useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useParams } from 'react-router-dom'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { useTranslation } from 'react-i18next'
import { formatUnits } from 'viem'
import { TransactionLoading } from '@renderer/components/TransactionLoading/TransactionLoading'

export function AppDetailsPage(): JSX.Element {
  const { t } = useTranslation()
  const { appId } = useParams()
  const chainId = useChainId()

  const addressToUse = chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS
  const abiToUse = chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI
  const { data, refetch } = useReadContract({
    address: addressToUse,
    abi: abiToUse,
    functionName: 'impactApps',
    args: [appId]
  })

  const [displayLoadingTx, setDisplayLoadingTx] = useState(false)
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash })

  function handleVoteApp(type: 'up' | 'down'): void {
    setDisplayLoadingTx(true)
    writeContract({
      address: addressToUse,
      abi: abiToUse,
      functionName: 'voteForImpactApp',
      args: [appId, type === 'up' ? 1 : 2]
    })
  }

  function impactAppVoted(): void {
    setDisplayLoadingTx(false)
    refetch()
  }

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
            <button
              className="w-[150px] h-18 rounded-2xl flex flex-col items-center justify-center bg-red-400 hover:cursor-pointer"
              onClick={() => handleVoteApp('down')}
            >
              <p className="font-bold text-white text-xl">{formatUnits(BigInt(appData[7]), 0)}</p>
              <p className="text-white text-sm">{t('votesDown')}</p>
              <p className="text-gray-200 text-xs">{t('clickToVote')}</p>
            </button>

            <button
              className="w-[150px] h-18 rounded-2xl flex flex-col items-center justify-center bg-green-500 hover:cursor-pointer"
              onClick={() => handleVoteApp('up')}
            >
              <p className="font-bold text-white text-xl">{formatUnits(BigInt(appData[8]), 0)}</p>
              <p className="text-white">{t('votesUp')}</p>
              <p className="text-gray-200 text-xs">{t('clickToVote')}</p>
            </button>
          </div>
        </div>
      </div>

      {displayLoadingTx && (
        <TransactionLoading
          close={() => setDisplayLoadingTx(false)}
          ok={impactAppVoted}
          isError={isError}
          isPending={isPending}
          isSuccess={isSuccess}
          loading={isLoading}
          transactionHash={hash}
        />
      )}
    </ScreenPage>
  )
}
