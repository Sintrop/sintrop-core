import { JSX, useState } from 'react'
import { useChainId, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useParams } from 'react-router-dom'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { useTranslation } from 'react-i18next'
import { formatUnits } from 'viem'
import { TransactionLoading } from '@renderer/components/TransactionLoading/TransactionLoading'
import { AppProps } from '@renderer/types/app'
import { Contracts } from './components/Contracts/Contracts'

export function AppDetailsPage(): JSX.Element {
  const { t } = useTranslation()
  const { appId } = useParams()
  const chainId = useChainId()

  const addressToUse = chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS
  const abiToUse = chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI
  const { data, refetch } = useReadContract({
    address: addressToUse,
    abi: abiToUse,
    functionName: 'getImpactApp',
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

  function handleCopyLink(link: string): void {
    navigator.clipboard.writeText(link)
    alert(t('linkCopiedToClipboard'))
  }

  const appData = data as AppProps
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
        <img src={appData.icon} className="w-[200px] h-[200px] rounded-2xl object-cover" />
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-white text-4xl">{appData.name}</h1>
          <p className="text-white">{appData.description}</p>
          <p className="text-gray-400">{appData.publisher}</p>

          <div className="flex gap-5 mt-3">
            <button
              className="w-[150px] h-18 rounded-2xl flex flex-col items-center justify-center bg-red-400 hover:cursor-pointer"
              onClick={() => handleVoteApp('down')}
            >
              <p className="font-bold text-white text-xl">
                {formatUnits(BigInt(appData.negativeVotes), 0)}
              </p>
              <p className="text-white text-sm">{t('votesDown')}</p>
              <p className="text-gray-200 text-xs">{t('clickToVote')}</p>
            </button>

            <button
              className="w-[150px] h-18 rounded-2xl flex flex-col items-center justify-center bg-green-500 hover:cursor-pointer"
              onClick={() => handleVoteApp('up')}
            >
              <p className="font-bold text-white text-xl">
                {formatUnits(BigInt(appData.positiveVotes), 0)}
              </p>
              <p className="text-white">{t('votesUp')}</p>
              <p className="text-gray-200 text-xs">{t('clickToVote')}</p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="text-white">{t('repositoryURL')}:</p>
          <p
            className="text-blue-500 underline hover:cursor-pointer"
            onClick={() => handleCopyLink(appData.repositoryUrl)}
          >
            {appData?.repositoryUrl}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <p className="text-white">{t('externalLink')}:</p>
          <p
            className="text-blue-500 underline hover:cursor-pointer"
            onClick={() => handleCopyLink(appData.externalLink)}
          >
            {appData?.externalLink}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-gray-300 text-sm">{t('contracts')}</p>
        <Contracts contracts={appData.contractAddresses} appId={parseInt(appId as string)} />
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
