import { useAppDispatch } from '../useAppDispatch';
import useLocalStorage from '../useLocalStorage';
import { setAddress, TonConnectionMode } from '../../features/ton/tonSlice';
import { useEffect, useState } from 'react';
import { useWalletInitData } from './useWalletInitData';
import { WalletsState } from '../../types/auth';
import { useSender } from './sender';

export function useTon() {
  const dispatch = useAppDispatch();
  const wallet = useWalletInitData();
  const [bcData, setBcData] = useLocalStorage<WalletsState>('wData', {
    currentWallet: -1,
    wallets: [],
  });

  const sender = useSender();

  const [tonMode, setTonMode] = useState<
    'disconnect' | 'tonconnect' | 'mnemonics'
  >('disconnect');

  useEffect(() => {
    if (bcData.currentWallet < 0) {
      setTonMode('disconnect');
    } else if (bcData.wallets[bcData.currentWallet].mode == 'tonconnect') {
      setTonMode('tonconnect');
    } else if (bcData.wallets[bcData.currentWallet].mode == 'mnemonics') {
      setTonMode('mnemonics');
    }
  }, []);

  return {
    mode: tonMode,
    wallet: wallet,
    sender: sender,
    setAddress: (
      address: string,
      mode: 'disconnect' | 'tonconnect' | 'mnemonics',
      publicKey?: string,
      privateKey?: string
    ) => {
      setBcData({
        currentWallet: 0,
        wallets: [
          {
            network: 'ton',
            mode: mode,
            publicKey: publicKey,
            address: address,
            privateKey: privateKey,
          },
        ],
      });
      setTonMode(mode);
      dispatch(
        setAddress({
          address: address,
          mode:
            mode == 'tonconnect'
              ? TonConnectionMode.tonconnect
              : mode == 'mnemonics'
              ? TonConnectionMode.mnemonics
              : TonConnectionMode.disconnect,
          publicKey: publicKey,
          privateKey: privateKey,
        })
      );
      console.log('useTon.setAddress', mode, address, publicKey);
    },
    setDisconnect: () => {
      setBcData({
        currentWallet: -1,
        wallets: [],
        // network: 'ton',
        // mode: 'disconnect',
      });
      setTonMode('disconnect');
      dispatch(
        setAddress({
          mode: TonConnectionMode.disconnect,
        })
      );
    },
  };
}
