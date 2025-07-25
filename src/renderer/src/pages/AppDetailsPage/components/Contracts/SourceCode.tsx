import { JSX } from 'react'
import { ContractAppListProps } from '@renderer/data/appsList'

interface Props {
  contract: ContractAppListProps
}
export function SourceCode({ contract }: Props): JSX.Element {
  return (
    <div className="flex flex-col p-5">
      <pre className="bg-card-3 p-3 rounded-2xl overflow-auto mt-2">
        <code className="text-white">{contract.contractString}</code>
      </pre>
    </div>
  )
}
