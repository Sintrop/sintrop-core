/* eslint-disable @typescript-eslint/no-explicit-any */
import FreeEducationCenterJson from '../../../contracts/testnet/FreeEducationCenter.sol/FreeEducationCenter.json'
import FreeEducationCenterCode from '../../../contracts/testnet/FreeEducationCenter.sol/FreeEducationCenter.sol?raw'
import GlobalPlantCatalogJson from '../../../contracts/testnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.json'
import GlobalPlantCatalogCode from '../../../contracts/testnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.sol?raw'
import RcTestRewardJson from '../../../contracts/testnet/RcTestReward.sol/RcTestReward.json'
import RcTestRewardCode from '../../../contracts/testnet/RcTestReward.sol/RcTestReward.sol?raw'

export interface AppListProps {
  id: number
  name: string
  mainnet: boolean
  contracts: ContractAppListProps[]
}

export interface ContractAppListProps {
  name: string
  abi: any
  address: string
  contractString: string
}
export const appsList: AppListProps[] = [
  {
    id: 1,
    name: 'Education Center',
    mainnet: false,
    contracts: [
      {
        name: 'Education Center',
        abi: FreeEducationCenterJson.abi,
        address: '0xbE3E071Be428d1c8dF9c0D039621EB05d6e38CCE',
        contractString: FreeEducationCenterCode
      }
    ]
  },
  {
    id: 2,
    name: 'Global Plant Catalog',
    mainnet: false,
    contracts: [
      {
        name: 'Global Plant Catalog',
        abi: GlobalPlantCatalogJson.abi,
        address: '0x7Ce2aB8499DC9310557Bcba5302A160808d151aC',
        contractString: GlobalPlantCatalogCode
      }
    ]
  },
  {
    id: 3,
    name: 'Rc Test Reward',
    mainnet: false,
    contracts: [
      {
        name: 'Rc Test Reward',
        abi: RcTestRewardJson.abi,
        address: '0x40D1e3babD5e71E6C4960A17704D9214cE153121',
        contractString: RcTestRewardCode
      }
    ]
  }
]
