import { JSX } from 'react'
import { Nav } from './components/Nav'

export function SideMenu(): JSX.Element {
  return (
    <aside className="w-[300px] h-screen fixed bg-card-2 flex flex-col pt-[100px] px-10">
      <Nav />
    </aside>
  )
}
