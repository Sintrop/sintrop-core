import { AppItem } from '@renderer/components/AppItem/AppItem'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { JSX } from 'react'
import { useTranslation } from 'react-i18next'

export function HomePage(): JSX.Element {
  const { t } = useTranslation()

  return (
    <ScreenPage pageTitle="Desktop">
      <section className="flex flex-col gap-2">
        <p className="text-gray-400">{t('impactApps')}</p>
        
        <div className="flex gap-10">
          <AppItem appId={1} />
          <AppItem appId={1} />
          <AppItem appId={1} />
          <AppItem appId={1} />
          <AppItem appId={1} />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-gray-400">{t('moreApps')}</p>
        
        <div className="flex gap-10">
          <AppItem appId={1} store />
          <AppItem appId={1} store />
          <AppItem appId={1} store />
        </div>
      </section>
    </ScreenPage>
  )
}
