import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { formatGwei, formatUnits } from 'viem'
import { useBlockNumber, useChainId, useGasPrice } from 'wagmi'

export function Stats(): JSX.Element {
  const { t } = useTranslation()
  const chainId = useChainId()
  const { data: resBlockNumber } = useBlockNumber()
  const { data: resGasPrice } = useGasPrice({ chainId })

  const blockNumber = resBlockNumber ? parseInt(formatUnits(resBlockNumber, 0)) : 0
  const gasPrice = resGasPrice ? parseInt(formatGwei(resGasPrice)) : 0

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-5">
        <DataItem
          label={t('network.currentBlock')}
          value={Intl.NumberFormat('pt-BR').format(blockNumber)}
        />
        <DataItem
          label={t('network.gasPrice')}
          value={Intl.NumberFormat('pt-BR').format(gasPrice)}
          suffix="GWEI"
        />
      </div>
    </div>
  )
}

interface DataItemProps {
  label: string
  value: string | number
  suffix?: string
}
function DataItem({ label, value, suffix }: DataItemProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center px-5 bg-card-2 w-56 h-12 rounded-2xl">
      <p className="text-white text-sm">{label}:</p>
      <p className="text-white text-sm font-bold">
        {value} {suffix && suffix}
      </p>
    </div>
  )
}
