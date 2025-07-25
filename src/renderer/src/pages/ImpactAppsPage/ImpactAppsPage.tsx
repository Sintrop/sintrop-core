import { JSX } from 'react'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { useChainId, useReadContract } from 'wagmi'
import { AppItem } from '@renderer/components/AppItem/AppItem'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { APP_STORE_ABI, SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { formatUnits } from 'viem'

export function ImpactAppsPage(): JSX.Element {
  const chainId = useChainId()
  const { data, isLoading } = useReadContract({
    address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
    abi: chainId === 250225 ? APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
    functionName: 'impactAppsCount'
  })

  const appsCount = data ? parseInt(formatUnits(BigInt(data as string), 0)) : 0
  const appsIds = Array.from({ length: appsCount }, (_, i) => i + 1).reverse()

  if (isLoading) {
    return (
      <ScreenPage pageTitle="Impact Apps">
        <div className="flex flex-col h-screen items-center justify-center">
          <div className="w-30 h-30 bg-green-primary animate-spin" />
        </div>
      </ScreenPage>
    )
  }

  return (
    <ScreenPage pageTitle="Impact Apps">
      <div className="flex flex-col">
        <div className="flex flex-wrap">
          {appsIds.map((item, index) => (
            <AppItem key={index} appId={item} store onlyImpactApp />
          ))}
        </div>
      </div>
    </ScreenPage>
  )
}
