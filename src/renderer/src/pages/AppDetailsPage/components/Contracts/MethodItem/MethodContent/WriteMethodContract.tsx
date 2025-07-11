/* eslint-disable @typescript-eslint/ban-ts-comment */
import { JSX, useEffect, useState } from 'react'
import { ContractListProps, MethodAbiProps } from '@renderer/types/contract'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { TransactionLoading } from '@renderer/components/TransactionLoading/TransactionLoading'

interface Props {
  method: MethodAbiProps
  contract: ContractListProps
  args: string[]
}

export function WriteMethodContract({ contract, method, args }: Props): JSX.Element {
  const { writeContract, data: hash, isError, isPending } = useWriteContract()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })
  const [displayLoadingTx, setDisplayLoadingTx] = useState(false)

  useEffect(() => {
    setDisplayLoadingTx(true)
    writeContract({
      //@ts-ignore
      address: contract.address,
      abi: contract?.abi,
      functionName: method.name,
      args
    })
  }, [])

  function transactionSuccess(): void {
    setDisplayLoadingTx(false)
  }

  return (
    <div className="flex flex-col">
      {displayLoadingTx && (
        <TransactionLoading
          close={() => setDisplayLoadingTx(false)}
          ok={transactionSuccess}
          isError={isError}
          isPending={isPending}
          isSuccess={isSuccess}
          loading={isLoading}
          transactionHash={hash}
        />
      )}
    </div>
  )
}
