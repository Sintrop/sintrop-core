import { JSX } from 'react'
import { CommunityIcon } from '@renderer/assets/icon/CommunityIcon'
import { ComputerIcon } from '@renderer/assets/icon/ComputerIcon'
import { ContractsIcon } from '@renderer/assets/icon/ContractsIcon'
import { ContributionsIcon } from '@renderer/assets/icon/ContributionsIcon'
import { DashboardIcon } from '@renderer/assets/icon/DashboardIcon'
import { DevelopmentIcon } from '@renderer/assets/icon/DevelopmentIcon'
import { InspectionIcon } from '@renderer/assets/icon/InspectionIcon'
import { MyTokensIcon } from '@renderer/assets/icon/MyTokensIcon'
import { PoolsIcon } from '@renderer/assets/icon/PoolsIcon'
import { RcStatsIcon } from '@renderer/assets/icon/RcStatsIcon'
import { ResearchesIcon } from '@renderer/assets/icon/ResearchesIcon'
import { AppStoreIcon } from '@renderer/assets/icon/AppStoreIcon'
import { HomeIcon } from '@renderer/assets/icon/HomeIcon'
import { IpfsIcon } from '@renderer/assets/icon/IpfsIcon'
import { NetworkIcon } from '@renderer/assets/icon/NetworkIcon'
import { VerifiedFillIcon } from '@renderer/assets/icon/VerifiedFill'
import { VerifiedOutlineIcon } from '@renderer/assets/icon/VerifiedOutline'

interface Props {
  name: IconName
  size?: number
  color?: string
}

export function Icon({ name, color, size }: Props): JSX.Element {
  const Icon = icons[name]
  return <Icon size={size} color={color} />
}

const icons = {
  community: CommunityIcon,
  contracts: ContractsIcon,
  contributions: ContributionsIcon,
  computer: ComputerIcon,
  development: DevelopmentIcon,
  dashboard: DashboardIcon,
  inspections: InspectionIcon,
  myTokens: MyTokensIcon,
  rcStats: RcStatsIcon,
  researches: ResearchesIcon,
  pools: PoolsIcon,
  appStore: AppStoreIcon,
  home: HomeIcon,
  ipfs: IpfsIcon,
  network: NetworkIcon,
  verifiedFill: VerifiedFillIcon,
  verifiedOutline: VerifiedOutlineIcon
}

export type IconName = keyof typeof icons
export interface IconBaseProps {
  size?: number
  color?: string
}
