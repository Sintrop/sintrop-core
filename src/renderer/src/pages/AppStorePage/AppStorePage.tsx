import { JSX } from 'react'
import { useChainId, useReadContract } from 'wagmi'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'

export function AppStorePage(): JSX.Element {
  const chainId = useChainId()
  const { data } = useReadContract({
    address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
    abi: chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
    functionName: 'impactAppsCount'
  })

  return (
    <ScreenPage pageTitle="App Store">
      <div className="flex flex-col"></div>
    </ScreenPage>
  )
}
