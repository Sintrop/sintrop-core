import { IconBaseProps } from '@renderer/components/Icon/Icon'
import Contributions from './contributions.png'
import { JSX } from 'react'

export function ContributionsIcon({ size = 20 }: IconBaseProps): JSX.Element {
  return (
    <img src={Contributions} style={{ width: size, height: size }} className="object-contain" />
  )
}
