import { JSX } from 'react'

interface Props {
  appId: number
  store?: boolean
}
export function AppItem({ store }: Props): JSX.Element {
  if (store) {
    return (
      <div className="flex flex-col rounded-2xl p-2 bg-card-2 w-[150px] h-[200px] overflow-hidden">
        <div className="w-full h-[100px] bg-blue-950 rounded-xl"></div>

        <p className="font-bold text-white mt-5 text-center">Teste App</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-[150px] h-[180px]">
      <div className="w-full h-[150px] bg-blue-950 rounded-2xl"></div>

      <p className="font-bold text-white mt-1 text-center">Teste App</p>
    </div>
  )
}
