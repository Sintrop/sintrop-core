/* eslint-disable @typescript-eslint/ban-ts-comment */
import { JSX } from 'react'
import { formatUnits } from 'viem'
import { useReadContract } from 'wagmi'
import { ContractListProps, MethodAbiProps } from '@renderer/types/contract'

interface Props {
  method: MethodAbiProps
  contract: ContractListProps
  args: string[]
}

export function ReadMethodContract({ contract, method, args }: Props): JSX.Element {
  const { data, isError, isLoading, error, isSuccess } = useReadContract({
    //@ts-ignore
    address: contract.address,
    abi: contract?.abi,
    functionName: method.name,
    args
  })

  function customStringify(value): string {
    if (typeof value === 'bigint') {
      return value.toString() // Convert BigInt to string
    }
    return value
  }

  return (
    <div className="flex flex-col">
      {isLoading && <div className="bg-green-600 w-10 h-10 animate-spin" />}
      {isError && <p className="text-red-500">{error.message}</p>}

      {isSuccess && (
        <div className="flex flex-col p-3 rounded-2xl bg-container-secondary w-fit">
          {typeof data === 'string' && <p className="text-white">{data}</p>}

          {typeof data === 'number' && <p className="text-white">{data}</p>}

          {typeof data === 'boolean' && <p className="text-white">{data.toString()}</p>}

          {typeof data === 'bigint' && (
            <p className="text-white">
              {data?.toString().length > 17
                ? Intl.NumberFormat('pt-BR', { maximumFractionDigits: 5 }).format(
                    parseFloat(formatUnits(data, 18))
                  )
                : Intl.NumberFormat('pt-BR', { maximumFractionDigits: 5 }).format(
                    parseFloat(data.toString())
                  )}
            </p>
          )}

          {typeof data === 'object' && (
            <pre className="text-white">
              {JSON.stringify(data, (_key, value) => customStringify(value), 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
