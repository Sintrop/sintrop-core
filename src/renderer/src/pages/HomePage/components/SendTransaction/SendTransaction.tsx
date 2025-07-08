import { TransactionLoading } from '@renderer/components/TransactionLoading/TransactionLoading'
import { FormEvent, JSX, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { parseEther } from 'viem'
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

export function SendTransaction(): JSX.Element {
  const { t } = useTranslation()
  const [to, setTo] = useState('')
  const [value, setValue] = useState('')
  const [insufficientBalance, setInsufficientBalance] = useState(false)
  const [displayLoadingTx, setDisplayLoadingTx] = useState(false)

  const { address } = useAccount()
  const { data } = useBalance({ address })
  const { data: hash, sendTransaction, isPending } = useSendTransaction()
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash })
  
  const balance = data ? parseFloat(data.formatted) : 0

  useEffect(() => {
    if (parseFloat(value) > balance) {
      setInsufficientBalance(true)
    } else {
      setInsufficientBalance(false)
    }
  }, [balance, value])

  function handleSendTransaction(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    setDisplayLoadingTx(true)
    sendTransaction({ to: to as `0x${string}`, value: parseEther(value) })
  }

  function transactionSuccess(): void {
    setDisplayLoadingTx(false)
    setTo('')
    setValue('')
  }

  return (
    <div className="flex flex-col">
      <p className="text-gray-400 text-sm">{t('sendTransaction')}</p>

      <form className="flex flex-col w-[400px]" onSubmit={handleSendTransaction}>
        <label className="text-white text-sm">{t('to')}:</label>
        <input
          className="w-full h-10 rounded-2xl px-5 bg-card-2 text-white"
          placeholder={t('typeHere')}
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />

        <label className="text-white text-sm mt-3">{t('value')}:</label>
        <input
          className="w-full h-10 rounded-2xl px-5 bg-card-2 text-white"
          placeholder={t('typeHere')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          required
        />

        {insufficientBalance && (
          <p className="text-red-500 font-semibold mt-1">{t('insufficientBalance')}!</p>
        )}

        <button
          className="w-full bg-green-primary h-10 rounded-2xl mt-5 font-semibold text-white hover:cursor-pointer disabled:opacity-45 disabled:cursor-default"
          type="submit"
          disabled={insufficientBalance || !to.trim() || !value.trim()}
        >
          {t('send')}
        </button>
      </form>

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
