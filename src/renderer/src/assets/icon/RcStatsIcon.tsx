import { IconBaseProps } from '@renderer/components/Icon/Icon'
import Image from './rc-stats.png'
import { JSX } from 'react'

export function RcStatsIcon({ size = 20 }: IconBaseProps): JSX.Element {
  return <img src={Image} style={{ width: size, height: size }} className="object-contain" />
}
