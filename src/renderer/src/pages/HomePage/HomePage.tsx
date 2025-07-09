import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { Balance } from './components/Balance/Balance'
import { SendTransaction } from './components/SendTransaction/SendTransaction'

export function HomePage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <ScreenPage pageTitle="Overview">
      <Balance />
      <SendTransaction />
    </ScreenPage>
  )
}
