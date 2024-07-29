import { TonConnectUI, TonConnectUiOptions, useTonConnectUI } from "@tonconnect/ui-react"
import { useEffect } from "react"

export const useAppTonConnectUi = (): [TonConnectUI, (options: TonConnectUiOptions) => void] => {
  const [tonConnectUI, tonConnectUiOptions] = useTonConnectUI()

  useEffect(() => {
    tonConnectUiOptions({actionsConfiguration: {twaReturnUrl: window.location.href as `${string}://${string}`}})
  }, [window.location.href])

  return [tonConnectUI, tonConnectUiOptions]
}