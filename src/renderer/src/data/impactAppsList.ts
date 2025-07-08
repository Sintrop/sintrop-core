import GlobalPlantCatalogJson from '../../../impactApps/testnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.json'

export const impactAppsList = [
  {
    id: 1,
    name: 'Global Plant Catalog',
    mainnet: false,
    contracts: [
      {
        name: 'Global Plant Catalog',
        abi: GlobalPlantCatalogJson.abi,
        address: '0x7412c48186D880eb2a37c08726A631da4cd81b99'
      }
    ]
  }
]
