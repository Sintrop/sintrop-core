import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { sintrop } from '@renderer/chains/sintrop'
import { sequoia } from '@renderer/chains/sequoia'

export function NetworkData(): JSX.Element {
  return (
    <div className="flex gap-5">
      <CardData
        title={sintrop.name}
        chainId={sintrop.id}
        rpc={sintrop.rpcUrls.default.http[0]}
        explorer={sintrop.blockExplorers.default.url}
      />

      <CardData
        title={sequoia.name}
        chainId={sequoia.id}
        rpc={sequoia.rpcUrls.default.http[0]}
        explorer={sequoia.blockExplorers.default.url}
        testnet
      />
    </div>
  )
}

interface CardDataProps {
  title: string
  chainId: number
  rpc: string
  explorer: string
  testnet?: boolean
}
function CardData({ title, chainId, rpc, testnet, explorer }: CardDataProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col p-3 rounded-2xl bg-card-2 border border-gray-400 w-[400px]">
      <div className="flex items-center gap-5">
        <p className="text-white font-bold text-lg">{title}</p>
        {testnet && (
          <div className="w-fit px-5 h-8 flex items-center justify-center bg-red-500 rounded-2xl">
            <p className="text-white">testnet</p>
          </div>
        )}
      </div>

      <div className="mt-3 mb-1 flex items-center gap-1">
        <p className="text-white font-semibold">{t('chainId')}:</p>
        <p className="text-white">{chainId}</p>
      </div>
      <div className="mb-1 flex items-center gap-1">
        <p className="text-white font-semibold">RPC Url:</p>
        <p className="text-white">{rpc}</p>
      </div>
      <div className="mb-1 flex items-center gap-1">
        <p className="text-white font-semibold">{t('blockExplorer')}:</p>
        <p className="text-white">{explorer}</p>
      </div>
    </div>
  )
}
