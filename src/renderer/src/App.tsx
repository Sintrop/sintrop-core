import { WagmiProviderContainer } from './providers/wagmi'

function App(): React.JSX.Element {
  return (
    <WagmiProviderContainer>
      <div>
        <p className="text-red-500">olá</p>
      </div>
    </WagmiProviderContainer>
  )
}

export default App
