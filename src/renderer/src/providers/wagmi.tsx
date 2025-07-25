import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { sequoia } from '../chains/sequoia'
import { sintrop } from '@renderer/chains/sintrop'
import { useSettingsContext } from '@renderer/hooks/useSettingsContext'

const client = new QueryClient()

export function WagmiProviderContainer({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const { rpcUrl, sequoiaRpcUrl } = useSettingsContext()

  const config = createConfig({
    ssr: false,
    chains: [
      {
        ...sequoia,
        rpcUrls: {
          default: {
            http: [sequoiaRpcUrl]
          }
        }
      },
      {
        ...sintrop,
        rpcUrls: {
          default: {
            http: [rpcUrl]
          }
        }
      }
    ],
    connectors: [metaMask()],
    transports: {
      [sequoia.id]: http(),
      [sintrop.id]: http()
    }
  })

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
