import { JSX, ReactNode } from 'react'
import { Header } from '../Header/Header'
import { SideMenu } from '../SideMenu/SideMenu'
import { PageTitle } from '../PageTitle/PageTitle'
import { InfoBar } from './components/InfoBar'
import { NavBtns } from './components/NavBtns'

interface Props {
  pageTitle: string
  children: ReactNode
}

export function ScreenPage({ children, pageTitle }: Props): JSX.Element {
  return (
    <>
      <Header />

      <main className="bg-bg flex w-screen h-screen">
        <SideMenu />

        <div className="flex flex-col pt-20 pl-[300px] w-full">
          <InfoBar />

          <div className="flex flex-col gap-10 pt-10 pl-5 w-full pr-5 overflow-y-auto pb-32">
            <div className="flex flex-col gap-1">
              <NavBtns />
              <PageTitle title={pageTitle} />
            </div>
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
