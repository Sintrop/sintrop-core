import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { formatGwei, formatUnits } from 'viem'
import { useBlockNumber, useChainId, useGasPrice } from 'wagmi'

export function InfoBar(): JSX.Element {
  const { t } = useTranslation()
  const chainId = useChainId()
  const { data: resBlockNumber } = useBlockNumber()
  const { data: resGasPrice } = useGasPrice({ chainId })

  const blockNumber = resBlockNumber ? parseInt(formatUnits(resBlockNumber, 0)) : 0
  const gasPrice = resGasPrice ? parseInt(formatGwei(resGasPrice)) : 0

  return (
    <div className="flex items-center gap-8 w-full min-h-10 bg-green-700 px-5">
      <DataItem
        label={t('infoBar.currentBlock')}
        value={Intl.NumberFormat('pt-BR').format(blockNumber)}
      />
      <DataItem
        label={t('infoBar.gasPrice')}
        value={Intl.NumberFormat('pt-BR').format(gasPrice)}
        suffix="GWEI"
      />
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
    <div className="flex items-center gap-1">
      <p className="text-white text-sm">{label}:</p>
      <p className="text-white text-sm font-bold">
        {value} {suffix && suffix}
      </p>
    </div>
  )
}
