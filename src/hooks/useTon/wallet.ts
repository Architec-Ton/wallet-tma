import { selectAddress, selectTonMode } from "../../features/ton/tonSelector";
import { TonConnectionMode } from "../../features/ton/tonSlice";
import { useAppSelector } from "../useAppDispatch";
import { Address } from "@ton/core";

type BlockchainNetwork = "ton" | "undefined";

interface Wallet {
  network: BlockchainNetwork;
  mode: TonConnectionMode;
  address?: Address;
}

export function get_wallet(): Wallet {
  const walletAddress = useAppSelector(selectAddress);
  const walletMode = useAppSelector(selectTonMode);
  return {
    network: (walletMode == TonConnectionMode.disconnect
      ? "undefined"
      : "ton") as BlockchainNetwork,
    mode: walletMode,
    address: walletAddress ? Address.parse(walletAddress) : undefined,
  };
}
