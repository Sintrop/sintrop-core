import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'

export function HomePage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <ScreenPage pageTitle="Home">
      teste
    </ScreenPage>
  )
}
