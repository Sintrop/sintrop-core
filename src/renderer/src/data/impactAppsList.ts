import FreeEducationCenterJson from '../../../impactApps/mainnet/FreeEducationCenter.sol/contract.json'
import GlobalPlantCatalogJson from '../../../impactApps/mainnet/GlobalPlantCatalog.sol/GlobalPlantCatalog.json'
import WhitepaperCenterJson from '../../../impactApps/mainnet/WhitepaperCenter.sol/WhitepaperCenter.json'

export const impactAppsList = [
  {
    id: 1,
    name: 'Education Center',
    mainnet: true,
    contracts: [
      {
        name: 'Education Center',
        abi: FreeEducationCenterJson.abi,
        address: '0x99aC4E9DDc4CEa1faaE6E4146103725726B76C5A'
      }
    ]
  },
  {
    id: 2,
    name: 'Whitepaper center',
    mainnet: true,
    contracts: [
      {
        name: 'Whitepaper center',
        abi: WhitepaperCenterJson.abi,
        address: '0x6bA408D226FEB1036995A1451904C2d0DFD803Ff'
      }
    ]
  },
  {
    id: 3,
    name: 'Global Plant Catalog',
    mainnet: true,
    contracts: [
      {
        name: 'Global Plant Catalog',
        abi: GlobalPlantCatalogJson.abi,
        address: '0xA8698ADc13B6b9dCA3a9AcdADB682fAB02c62EEf'
      }
    ]
  },
  {
    id: 4,
    name: 'Humans Peace Treaty',
    mainnet: true,
    contracts: [
      {
        name: 'Humans Peace Treaty',
        abi: GlobalPlantCatalogJson.abi,
        address: '0xFD244507C6Da04A3Ab1df0ccf9341D84E76cd0a7'
      }
    ]
  }
]
