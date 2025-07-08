import { JSX } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  transactionHash?: `0x${string}`
  loading: boolean
  isPending: boolean
  isError: boolean
  isSuccess: boolean
  error?: undefined
  ok: () => void
  close: () => void
}

export function TransactionLoading({
  transactionHash,
  loading,
  isPending,
  isError,
  isSuccess,
  ok
}: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-card-2 p-6 rounded-2xl shadow-2xl w-96">
        {isPending && (
          <div className="w-full h-20 flex flex-col items-center justify-center">
            <p className="text-white">{t('confirmInYourWallet')}...</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col gap-5 w-full items-center pt-5">
            <div className="w-20 h-20 rounded-sm bg-green-primary animate-spin" />
            <p className="text-white">{t('processingTransaction')}...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center">
            <p className="text-red-500">{t('error')}</p>
          </div>
        )}

        {isSuccess && (
          <div className="flex flex-col items-center">
            <p className="text-green-primary">{t('transactionCompletedSuccessfully')}</p>
          </div>
        )}

        {transactionHash && (
          <div className="flex flex-col items-center">
            <p className="text-white text-ellipsis truncate text-sm mt-5">{transactionHash}</p>
            <p className="text-gray-400 text-xs">{t('transactionHash')}</p>
          </div>
        )}

        {isSuccess && (
          <div className="flex flex-col items-center mt-5">
            <button
              className="text-white px-10 h-10 rounded-2xl bg-green-600 font-semibold hover:cursor-pointer"
              onClick={ok}
            >
              {t('continue')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
