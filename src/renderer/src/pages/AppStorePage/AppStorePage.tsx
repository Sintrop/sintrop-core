import { JSX } from 'react'
import { useChainId, useReadContract } from 'wagmi'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { RegisterApp } from './components/RegisterApp'
import { formatUnits } from 'viem'
import { AppItem } from '@renderer/components/AppItem/AppItem'

export function AppStorePage(): JSX.Element {
  const chainId = useChainId()
  const { data } = useReadContract({
    address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
    abi: chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
    functionName: 'impactAppsCount'
  })

  const appsCount = data ? parseInt(formatUnits(BigInt(data as string), 0)) : 0
  console.log(appsCount)
  const appsIds = Array.from({ length: appsCount }, (_, i) => i + 1).reverse()

  return (
    <ScreenPage pageTitle="App Store">
      <RegisterApp />

      <div className="flex flex-wrap gap-5">
        {appsIds.map((item, index) => (
          <AppItem key={index} appId={item} store />
        ))}
      </div>
    </ScreenPage>
  )
}
