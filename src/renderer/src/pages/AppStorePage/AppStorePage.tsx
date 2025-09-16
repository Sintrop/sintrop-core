import { JSX, useState } from 'react'
import { useReadContract } from 'wagmi'
import { formatUnits } from 'viem'
import { useTranslation } from 'react-i18next'

import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { AppItem } from '@renderer/components/AppItem/AppItem'
import { useMainnet } from '@renderer/hooks/useMainnet'

import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { APP_STORE_ABI, SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { RegisterApp } from './components/RegisterApp'
import { ContractListProps } from '@renderer/types/contract'
import { MethodItem } from '@renderer/components/MethodItem/MethodItem'
import { TabItem } from '@renderer/components/TabItem/TabItem'

export function AppStorePage(): JSX.Element {
  const { t } = useTranslation()
  const mainnet = useMainnet()

  const [selectedTab, setSelectedTab] = useState('apps')

  const abi = mainnet ? APP_STORE_ABI : SEQUOIA_APP_STORE_ABI
  const address = mainnet ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS
  const appStoreContract: ContractListProps = {
    abi,
    address,
    name: 'App Store'
  }

  const { data } = useReadContract({
    address,
    abi,
    functionName: 'impactAppsCount'
  })

  const appsCount = data ? parseInt(formatUnits(BigInt(data as string), 0)) : 0
  const appsIds = Array.from({ length: appsCount }, (_, i) => i + 1).reverse()

  return (
    <ScreenPage pageTitle="App Store">
      <div className="flex flex-col relative gap-5">
        <div className="absolute top-[-30px] right-5">
          <RegisterApp />
        </div>

        <div className="flex items-center gap-5">
          <TabItem
            label={t('appStore.apps')}
            onChange={setSelectedTab}
            value="apps"
            isSelected={selectedTab === 'apps'}
          />

          <TabItem
            label={t('appStore.contract')}
            onChange={setSelectedTab}
            value="contract"
            isSelected={selectedTab === 'contract'}
          />
        </div>

        {selectedTab === 'apps' && (
          <div className="flex flex-wrap gap-5">
            {appsIds.map((item, index) => (
              <AppItem key={index} appId={item} store />
            ))}
          </div>
        )}

        {selectedTab === 'contract' && (
          <div className="flex flex-col gap-3 bg-card-2 rounded-2xl">
            {appStoreContract.abi.map((item, index) => (
              <MethodItem contract={appStoreContract} method={item} key={index} />
            ))}
          </div>
        )}
      </div>
    </ScreenPage>
  )
}
