import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { JSX } from 'react'
import { Stats } from './components/Stats'
import { NetworkData } from './components/NetworkData'

export function NetworkPage(): JSX.Element {
  return (
    <ScreenPage pageTitle="Network">
      <Stats />
      <NetworkData />
    </ScreenPage>
  )
}
