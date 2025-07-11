import { IconBaseProps } from '@renderer/components/Icon/Icon'
import Development from './development.png'
import { JSX } from 'react'

export function DevelopmentIcon({ size = 20 }: IconBaseProps): JSX.Element {
  return <img src={Development} style={{ width: size, height: size }} className="object-contain" />
}
