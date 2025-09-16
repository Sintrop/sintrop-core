import { JSX } from 'react'

interface Props {
  label: string
  icon?: string
  onChange: (value: string) => void
  value: string
  isSelected?: boolean
}
export function TabItem({ label, isSelected, value, onChange }: Props): JSX.Element {
  return (
    <button
      className={`px-5 w-fit py-1 border-b-2 hover:cursor-pointer ${isSelected ? 'border-green-600 text-green-600' : 'border-transparent text-white'}`}
      onClick={() => onChange(value)}
    >
      {label}
    </button>
  )
}
