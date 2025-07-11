import { JSX } from 'react'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { useChainId } from 'wagmi'
import { impactAppsList } from '@renderer/data/impactAppsList'
import { AppItem } from '@renderer/components/AppItem/AppItem'

export function ImpactAppsPage(): JSX.Element {
  const chainId = useChainId()
  const mainnet = chainId === 250225
  const impactApps = impactAppsList.filter((app) => app.mainnet === mainnet)

  return (
    <ScreenPage pageTitle="Impact Apps">
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          {impactApps.map((item, index) => (
            <AppItem key={index} appId={item.id} store />
          ))}
        </div>
      </div>
    </ScreenPage>
  )
}
