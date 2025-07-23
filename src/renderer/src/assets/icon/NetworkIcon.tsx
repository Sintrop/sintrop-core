import { JSX } from 'react'
import { IconBaseProps } from '@renderer/components/Icon/Icon'
import Img from './Network.png'

export function NetworkIcon({ size = 20 }: IconBaseProps): JSX.Element {
  return <img src={Img} style={{ width: size, height: size }} className="object-contain" />
}
