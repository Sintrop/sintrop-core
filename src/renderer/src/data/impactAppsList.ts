import GlobalPlantCatalogJson from '../../../impactApps/testnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.json'
import FreeEducationCenterJson from '../../../impactApps/testnet/FreeEducationCenter.sol/FreeEducationCenter.json'

export const impactAppsList = [
  {
    id: 1,
    name: 'Education Center',
    mainnet: false,
    contracts: [
      {
        name: 'Education Center',
        abi: FreeEducationCenterJson.abi,
        address: '0x4C60Be2cD6326137f931Ba91443f7F06EF2E2758'
      }
    ]
  },
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
  }
]
