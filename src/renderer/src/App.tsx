import { WagmiProviderContainer } from './providers/wagmi'
import { AppRoutes } from './routes'

function App(): React.JSX.Element {
  return (
    <WagmiProviderContainer>
      <AppRoutes />
    </WagmiProviderContainer>
  )
}

export default App
