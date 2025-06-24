import { useTranslation } from 'react-i18next'
import { WagmiProviderContainer } from './providers/wagmi'

function App(): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <WagmiProviderContainer>
      <div>
        <p className="text-red-500">{t('helloWorld')}</p>
      </div>
    </WagmiProviderContainer>
  )
}

export default App
