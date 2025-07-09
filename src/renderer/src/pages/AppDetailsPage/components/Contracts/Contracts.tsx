import { JSX } from 'react'
import { ContractItem } from './ContractItem'

interface Props {
  contracts: string[]
  appId: number
}

export function Contracts({ contracts, appId }: Props): JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      {contracts.map((contract, index) => (
        <ContractItem key={index} address={contract} appId={appId} />
      ))}
    </div>
  )
}
