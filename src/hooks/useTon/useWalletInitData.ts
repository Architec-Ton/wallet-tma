import { useMemo } from 'react';
import {
  selectAddress,
  selectAddressPublicKey,
  selectTonMode,
} from '../../features/ton/tonSelector';
import { TonConnectionMode } from '../../features/ton/tonSlice';
import { useAppSelector } from '../useAppDispatch';
import { Address } from '@ton/core';

type BlockchainNetwork = 'ton' | 'undefined';

interface Wallet {
  network: BlockchainNetwork;
  mode: TonConnectionMode;
  address?: Address;
  publicKey?: string;
}

export const useWalletInitData = (): Wallet => {
  const walletAddress = useAppSelector(selectAddress);
  const walletAddressPublicKey = useAppSelector(selectAddressPublicKey);
  const walletMode = useAppSelector(selectTonMode);
  const initData = useMemo(() => {
    return {
      network: (walletMode == TonConnectionMode.disconnect
        ? 'undefined'
        : 'ton') as BlockchainNetwork,
      mode: walletMode,
      address: walletAddress ? Address.parse(walletAddress) : undefined,
      publicKey: walletAddressPublicKey,
    };
  }, [walletAddress, walletMode]);

  // console.log("walletMode", walletMode, walletAddress, initData)
  return initData;
};
