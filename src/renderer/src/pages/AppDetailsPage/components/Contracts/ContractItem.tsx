/* eslint-disable @typescript-eslint/ban-ts-comment */
import { appsList, ContractAppListProps } from '@renderer/data/appsList'
import { ContractListProps, MethodAbiProps } from '@renderer/types/contract'
import { JSX, useEffect, useState } from 'react'
import { useChainId } from 'wagmi'
import { MethodItem } from './MethodItem/MethodItem'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { Icon } from '@renderer/components/Icon/Icon'
import { SourceCode } from './SourceCode'

interface Props {
  address: string
  appId: number
}

export function ContractItem({ address, appId }: Props): JSX.Element {
  const { t } = useTranslation()
  const chainId = useChainId()
  const mainnet = chainId === 250225

  const [contract, setContract] = useState<ContractAppListProps>()
  const [methods, setMethods] = useState<MethodAbiProps[]>([])
  const [showMethods, setShowMethods] = useState(false)
  const [contractName, setContractName] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<'methods' | 'code'>('methods')

  useEffect(() => {
    const app = appsList.find((app) => app.id === appId && app.mainnet === mainnet)
    if (app) {
      const contractData = app.contracts.find((contract) => contract.address === address)
      if (contractData) {
        //@ts-ignore
        setMethods(contractData?.abi)
        setContract(contractData)
        setContractName(contractData.name)
        setShowMethods(true)
      }
    }
  }, [])

  function toggleShowMethods(): void {
    setShowMethods((value) => !value)
  }

  return (
    <div className="flex flex-col bg-card-2 rounded-2xl">
      <button
        className="w-full h-10 px-3 flex items-center justify-between hover:cursor-pointer disabled:cursor-default"
        disabled={methods.length === 0}
        onClick={toggleShowMethods}
      >
        <div className="flex items-center gap-5">
          <p className="text-white">
            {address}
            {contractName ? ` - (${contractName})` : ` - (${t('appDetails.notVerified')})`}
          </p>

          {contractName && (
            <div className="flex items-center gap-2">
              <Icon name="verifiedOutline" size={30} color="#13ED37" />
              <p className="text-[#13ED37] text-center">{t('appDetails.sourceCodeVerified')}</p>
            </div>
          )}
        </div>

        {contractName && (
          <>{showMethods ? <FaChevronUp color="white" /> : <FaChevronDown color="white" />}</>
        )}
      </button>

      {showMethods && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-5 px-5">
            <button
              className={`w-fit px-10 h-10 font-semibold border rounded-2xl ${selectedTab === 'methods' ? 'text-green-600 border-green-600' : 'text-white border-transparent'} hover:cursor-pointer`}
              onClick={() => setSelectedTab('methods')}
            >
              {t('appDetails.methods')}
            </button>

            <button
              className={`w-fit px-10 h-10 font-semibold border rounded-2xl ${selectedTab === 'code' ? 'text-green-600 border-green-600' : 'text-white border-transparent'} hover:cursor-pointer`}
              onClick={() => setSelectedTab('code')}
            >
              {t('appDetails.code')}
            </button>
          </div>

          {selectedTab === 'methods' && (
            <>
              {methods.length > 0 && (
                <>
                  {methods.map((method, index) => (
                    <MethodItem
                      key={index}
                      method={method}
                      contract={contract as ContractListProps}
                    />
                  ))}
                </>
              )}
            </>
          )}

          {selectedTab === 'code' && <>{contract && <SourceCode contract={contract} />}</>}
        </div>
      )}
    </div>
  )
}
