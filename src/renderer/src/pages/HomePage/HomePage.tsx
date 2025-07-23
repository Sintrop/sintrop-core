import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { JSX } from 'react'
import { Balance } from './components/Balance/Balance'
import { SendTransaction } from './components/SendTransaction/SendTransaction'
import { useTranslation } from 'react-i18next'

export function HomePage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <ScreenPage pageTitle={t('overview.title')}>
      <Balance />
      <SendTransaction />
    </ScreenPage>
  )
}
