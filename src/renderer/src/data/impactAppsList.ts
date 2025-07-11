import GlobalPlantCatalogJson from '../../../impactApps/testnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.json'
import FreeEducationCenterJson from '../../../impactApps/testnet/FreeEducationCenter.sol/FreeEducationCenter.json'

export const impactAppsList = [
  {
    id: 4,
    name: 'Global Plant Catalog',
    mainnet: false,
    contracts: [
      {
        name: 'Global Plant Catalog',
        abi: GlobalPlantCatalogJson.abi,
        address: '0x4d956b25c27bb91f1850c1F711843Aff72B77204'
      }
    ]
  },
  {
    id: 5,
    name: 'Education Center',
    mainnet: false,
    contracts: [
      {
        name: 'Education Center',
        abi: FreeEducationCenterJson.abi,
        address: '0x19eAc25A2eFcA7Dd8CF207BCbb0ff40389c55837'
      }
    ]
  }
]
