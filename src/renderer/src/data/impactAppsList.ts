import GlobalPlantCatalogJson from '../../../impactApps/testnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.json'
import FreeEducationCenterJson from '../../../impactApps/testnet/FreeEducationCenter.sol/FreeEducationCenter.json'

export const impactAppsList = [
  {
    id: 2,
    name: 'Global Plant Catalog',
    mainnet: false,
    contracts: [
      {
        name: 'Global Plant Catalog',
        abi: GlobalPlantCatalogJson.abi,
        address: '0x7412c48186D880eb2a37c08726A631da4cd81b99'
      }
    ]
  },
  {
    id: 3,
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
