import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { JSX } from 'react'
import { useChainId, useReadContract } from 'wagmi'

interface Props {
  appId: number
  store?: boolean
}
export function AppItem({ store, appId }: Props): JSX.Element {
  const chainId = useChainId()
  const { data } = useReadContract({
    address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
    abi: chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
    functionName: 'impactApps',
    args: [appId]
  })

  const appData = data as string[]
  if (!appData) return <div />

  if (store) {
    return (
      <div className="flex flex-col rounded-2xl p-2 bg-card-2 w-[150px] h-[200px] overflow-hidden">
        <div className="w-full h-[100px] bg-blue-950 rounded-xl">
          <img src={appData[4]} className="w-full h-full rounded-2xl object-cover" />
        </div>

        <p className="font-bold text-white mt-5 text-center">{appData[2]}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-[150px] h-[180px]">
      <div className="w-full h-[150px] bg-blue-950 rounded-2xl">
          <img src={appData[4]} className="w-full h-full rounded-2xl object-cover" />
      </div>

      <p className="font-bold text-white mt-1 text-center">{appData[2]}</p>
    </div>
  )
}
