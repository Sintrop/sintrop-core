import { SettingsProvider } from './contexts/SettingsContext'
import { WagmiProviderContainer } from './providers/wagmi'
import { AppRoutes } from './routes'

function App(): React.JSX.Element {
  return (
    <SettingsProvider>
      <WagmiProviderContainer>
        <AppRoutes />
      </WagmiProviderContainer>
    </SettingsProvider>
  )
}

export default App
