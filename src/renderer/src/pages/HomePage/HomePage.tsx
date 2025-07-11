import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { JSX } from 'react'
import { Balance } from './components/Balance/Balance'
import { SendTransaction } from './components/SendTransaction/SendTransaction'

export function HomePage(): JSX.Element {
  return (
    <ScreenPage pageTitle="Overview">
      <Balance />
      <SendTransaction />
    </ScreenPage>
  )
}
