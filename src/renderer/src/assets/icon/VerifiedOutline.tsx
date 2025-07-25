import { IconBaseProps } from '@renderer/components/Icon/Icon'
import { JSX } from 'react'

export function VerifiedOutlineIcon({ color = 'white', size = 20 }: IconBaseProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8.5 12.5L11 15l4.5-4.5m-.595-5.512l-.48-.659a3 3 0 00-4.85 0l-.48.659-.804-.127a3 3 0 00-3.43 3.43l.127.804-.659.48a3 3 0 000 4.85l.659.48-.127.804a3 3 0 003.43 3.43l.804-.127.48.659a3 3 0 004.85 0l.48-.659.804.127a3 3 0 003.43-3.43l-.127-.804.659-.48a3 3 0 000-4.85l-.659-.48.127-.804a3 3 0 00-3.43-3.43l-.804.127z"
      />
    </svg>
  )
}
