import { JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Jazzicon } from '@ukstv/jazzicon-react'
import { MdLogout } from 'react-icons/md'

export function ConnectButton(): JSX.Element {
  const { t } = useTranslation()
  const { address, status, isConnecting, isReconnecting } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  function handleClickConnectButton(): void {
    if (status === 'disconnected') {
      connect({ connector: connectors[0] })
    }
  }

  function handleDisconnect(): void {
    if (status === 'connected') {
      disconnect()
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        className="w-[180px] px-4 h-10 rounded-2xl bg-green-600 text-white font-semibold hover:cursor-pointer flex items-center justify-center gap-3"
        onClick={handleClickConnectButton}
        disabled={isConnecting || isReconnecting}
      >
        {isConnecting || isReconnecting ? (
          <div className="flex w-full h-full justify-center items-center">
            <div className="w-7 h-7 bg-blue-700 animate-spin" />
          </div>
        ) : (
          <>
            {status === 'disconnected' && t('connectWallet')}
            {status === 'connected' && (
              <div className="flex items-center gap-1">
                <Jazzicon address={address} className="w-8 h-8" />
                <p className="truncate text-ellipsis text-white max-w-[100px]">{address}</p>
              </div>
            )}
          </>
        )}
      </button>

      {status === 'connected' && (
        <button
          onClick={handleDisconnect}
          className="p-2 bg-card-1 rounded-md hover:cursor-pointer"
        >
          <MdLogout color="white" />
        </button>
      )}
    </div>
  )
}
