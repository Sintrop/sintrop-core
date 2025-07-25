import { JSX } from 'react'
import { IconBaseProps } from '@renderer/components/Icon/Icon'
import Img from './appStore.png'

export function AppStoreIcon({ size = 20 }: IconBaseProps): JSX.Element {
  return <img src={Img} style={{ width: size, height: size }} className="object-contain" />
}
