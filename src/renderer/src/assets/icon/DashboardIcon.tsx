import { IconBaseProps } from '@renderer/components/Icon/Icon'
import Dashboard from './dashboard.png'
import { JSX } from 'react'

export function DashboardIcon({ size = 20 }: IconBaseProps): JSX.Element {
  return <img src={Dashboard} style={{ width: size, height: size }} className="object-contain" />
}
