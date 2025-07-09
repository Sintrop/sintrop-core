/* eslint-disable @typescript-eslint/ban-ts-comment */
import { impactAppsList } from '@renderer/data/impactAppsList'
import { ContractListProps, MethodAbiProps } from '@renderer/types/contract'
import { JSX, useEffect, useState } from 'react'
import { useChainId } from 'wagmi'
import { MethodItem } from './MethodItem/MethodItem'

interface Props {
  address: string
  appId: number
}

export function ContractItem({ address, appId }: Props): JSX.Element {
  const chainId = useChainId()
  const mainnet = chainId === 250225

  const [contract, setContract] = useState({})
  const [methods, setMethods] = useState<MethodAbiProps[]>([])
  const [showMethods, setShowMethods] = useState(false)

  useEffect(() => {
    const app = impactAppsList.find((app) => app.id === appId && app.mainnet === mainnet)
    if (app) {
      const contractData = app.contracts.find((contract) => contract.address === address)
      if (contractData) {
        //@ts-ignore
        setMethods(contractData?.abi)
        setContract(contractData)
      }
    }
  }, [])

  function toggleShowMethods(): void {
    setShowMethods((value) => !value)
  }

  return (
    <div className="flex flex-col bg-card-2 rounded-2xl">
      <button
        className="w-full h-10 px-3 flex items-center hover:cursor-pointer disabled:cursor-default"
        disabled={methods.length === 0}
        onClick={toggleShowMethods}
      >
        <p className="text-white">{address}</p>
      </button>

      {showMethods && (
        <div className="flex flex-col gap-3">
          {methods.length > 0 && (
            <>
              {methods.map((method, index) => (
                <MethodItem key={index} method={method} contract={contract as ContractListProps} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
