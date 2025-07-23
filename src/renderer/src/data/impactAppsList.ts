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
  }
]
