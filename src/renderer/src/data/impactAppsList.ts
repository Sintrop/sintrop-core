import FreeEducationCenterJson from '../../../impactApps/testnet/FreeEducationCenter.sol/FreeEducationCenter.json'
import GlobalPlantCatalogJson from '../../../impactApps/testnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.json'
import RcTestRewardJson from '../../../impactApps/testnet/RcTestReward.sol/RcTestReward.json'

export const impactAppsList = [
  {
    id: 1,
    name: 'Education Center',
    mainnet: false,
    contracts: [
      {
        name: 'Education Center',
        abi: FreeEducationCenterJson.abi,
        address: '0xbE3E071Be428d1c8dF9c0D039621EB05d6e38CCE'
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
        address: '0x7Ce2aB8499DC9310557Bcba5302A160808d151aC'
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
        address: '0x40D1e3babD5e71E6C4960A17704D9214cE153121'
      }
    ]
  }
]
