import { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoSintrop from '../../assets/images/white-logo.png'

export function Header(): JSX.Element {
  const navigate = useNavigate()

  function handleBackToHome(): void {
    navigate('/', { replace: true })
  }

  return (
    <header className="w-screen h-[80px] bg-green-primary fixed z-10">
      <div className="px-10 flex items-center justify-between h-full">
        <button className="flex items-center gap-3 hover:cursor-pointer" onClick={handleBackToHome}>
          <img src={LogoSintrop} alt="Logo Sintrop" className="w-32 h-10 object-contain" />
        </button>

        <div className="flex items-center gap-5"></div>
      </div>
    </header>
  )
}
