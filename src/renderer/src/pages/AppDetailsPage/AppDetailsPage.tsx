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
import { Icon } from '@renderer/components/Icon/Icon'

export function AppDetailsPage(): JSX.Element {
  const { t } = useTranslation()
  const { appId } = useParams()
  const chainId = useChainId()

  const addressToUse = chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS
  const abiToUse = chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI
  const {
    data,
    refetch,
    isLoading: loadingApp
  } = useReadContract({
    address: addressToUse,
    abi: abiToUse,
    functionName: 'getImpactApp',
    args: [appId]
  })

  const [displayLoadingTx, setDisplayLoadingTx] = useState(false)
  const { data: hash, writeContract, isPending, error, isError } = useWriteContract()
  const {
    isLoading,
    isSuccess,
    isError: isErrorTx,
    error: errorTx
  } = useWaitForTransactionReceipt({ hash })
  const errorMessage = error ? error.message : errorTx ? errorTx.message : ''

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
    alert(t('appDetails.linkCopiedToClipboard'))
  }

  const appData = data as AppProps
  if (loadingApp) {
    return (
      <ScreenPage pageTitle={t('appDetails.title')}>
        <div className="flex flex-col h-screen items-center justify-center">
          <div className="w-30 h-30 bg-green-primary animate-spin" />
        </div>
      </ScreenPage>
    )
  }

  if (!appData) {
    return (
      <ScreenPage pageTitle={t('appDetails.title')}>
        <div />
      </ScreenPage>
    )
  }

  const negativeVotes = parseInt(formatUnits(BigInt(appData.negativeVotes), 0))
  const positiveVotes = parseInt(formatUnits(BigInt(appData.positiveVotes), 0))
  const isImpactApp = positiveVotes > negativeVotes

  return (
    <ScreenPage pageTitle={t('appDetails.title')}>
      <div className="flex gap-5 mt-5">
        <img src={appData.icon} className="w-[200px] h-[200px] rounded-2xl object-cover" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-5">
            <h1 className="font-bold text-white text-4xl">
              #{appId} - {appData.name}
            </h1>

            {isImpactApp && (
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-card-2">
                <Icon name="verifiedFill" size={30} color="#13ED37" />
                <p className="text-white text-center">{t('appDetails.impactApp')}</p>
              </div>
            )}
          </div>
          <p className="text-white">{appData.description}</p>
          <p className="text-gray-400">{appData.publisher}</p>

          <div className="flex gap-5 mt-3 items-center">
            <button
              className="w-[150px] h-18 rounded-2xl flex flex-col items-center justify-center bg-red-400 hover:cursor-pointer"
              onClick={() => handleVoteApp('down')}
            >
              <p className="font-bold text-white text-xl">{negativeVotes}</p>
              <p className="text-white text-sm">{t('appDetails.votesDown')}</p>
              <p className="text-gray-200 text-xs">{t('appDetails.clickToVote')}</p>
            </button>

            <button
              className="w-[150px] h-18 rounded-2xl flex flex-col items-center justify-center bg-green-500 hover:cursor-pointer"
              onClick={() => handleVoteApp('up')}
            >
              <p className="font-bold text-white text-xl">{positiveVotes}</p>
              <p className="text-white">{t('appDetails.votesUp')}</p>
              <p className="text-gray-200 text-xs">{t('appDetails.clickToVote')}</p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <p className="text-white">{t('appDetails.repositoryURL')}:</p>
          <p
            className="text-blue-500 underline hover:cursor-pointer"
            onClick={() => handleCopyLink(appData.repositoryUrl)}
          >
            {appData?.repositoryUrl}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <p className="text-white">{t('appDetails.externalLink')}:</p>
          <p
            className="text-blue-500 underline hover:cursor-pointer"
            onClick={() => handleCopyLink(appData.externalLink)}
          >
            {appData?.externalLink}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-gray-300 text-sm">{t('appDetails.contracts')}</p>
        <Contracts contracts={appData.contractAddresses} appId={parseInt(appId as string)} />
      </div>

      {displayLoadingTx && (
        <TransactionLoading
          errorMessage={errorMessage}
          close={() => setDisplayLoadingTx(false)}
          ok={impactAppVoted}
          isError={isError || isErrorTx}
          isPending={isPending}
          isSuccess={isSuccess}
          loading={isLoading}
          transactionHash={hash}
        />
      )}
    </ScreenPage>
  )
}
