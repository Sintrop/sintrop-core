import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { AppProps } from '@renderer/types/app'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatUnits } from 'viem'
import { useChainId, useReadContract } from 'wagmi'
import { Icon } from '../Icon/Icon'

interface Props {
  appId: number
  store?: boolean
  onlyImpactApp?: boolean
}
export function AppItem({ store, appId, onlyImpactApp }: Props): JSX.Element {
  const navigate = useNavigate()
  const chainId = useChainId()
  const { data } = useReadContract({
    address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
    abi: chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
    functionName: 'getImpactApp',
    args: [appId]
  })

  function handleGoToAppDetails(): void {
    navigate(`/app-details/${appId}`)
  }

  const appData = data as AppProps

  if (!appData) return <div />

  const negativeVotes = parseInt(formatUnits(BigInt(appData.negativeVotes), 0))
  const positiveVotes = parseInt(formatUnits(BigInt(appData.positiveVotes), 0))
  const isImpactApp = positiveVotes > negativeVotes

  if (onlyImpactApp && !isImpactApp) return <div />

  if (store) {
    return (
      <button
        className="flex flex-col rounded-2xl p-2 bg-card-2 w-[150px] h-[200px] overflow-hidden hover:cursor-pointer relative"
        onClick={handleGoToAppDetails}
      >
        <div className="w-full h-[120px] bg-blue-950 rounded-xl">
          <img src={appData.icon} className="w-full h-full rounded-2xl object-cover" />
        </div>

        <p className="font-bold text-white mt-3 text-center">{appData.name}</p>

        {isImpactApp && (
          <div className="absolute top-1 right-1">
            <Icon name="verifiedFill" size={35} color="#13ED37" />
          </div>
        )}
      </button>
    )
  }

  return (
    <button
      className="flex flex-col w-[150px] h-[180px] hover:cursor-pointer relative"
      onClick={handleGoToAppDetails}
    >
      <div className="w-full h-[120px] bg-blue-950 rounded-md">
        <img src={appData.icon} className="w-full h-full rounded-md object-cover" />
      </div>

      <p className="font-bold text-white mt-1 text-center">{appData.name}</p>

      {isImpactApp && (
        <div className="absolute top-1 right-1">
          <Icon name="verifiedFill" size={35} color="#13ED37" />
        </div>
      )}
    </button>
  )
}
