import { useChainId, useSwitchChain as useSwitchChainHook } from 'wagmi'

interface ReturnUseSwitchChain {
  switchChain: () => Promise<void>
  isSuccess: boolean
}
export function useSwitchChain(): ReturnUseSwitchChain {
  const chainId = useChainId()
  const mainnet = chainId === 250225

  const { switchChain: handleSwitch, isSuccess } = useSwitchChainHook()

  async function switchChain(): Promise<void> {
    handleSwitch({ chainId: mainnet ? 250225 : 1600 })
  }

  return {
    switchChain,
    isSuccess
  }
}
