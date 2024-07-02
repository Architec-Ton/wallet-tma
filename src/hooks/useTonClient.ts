//import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from '@ton/ton';
import { useAsyncInitialize } from './useAsyncInitialize';
import { CHAIN } from '@tonconnect/protocol';
import { useTonWallet } from '@tonconnect/ui-react';
import { TA_URL } from '../constants';

export function useTonClient() {
  const wallet = useTonWallet();
  const network = wallet?.account.chain ?? null;

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;
      return new TonClient({
        // endpoint: await getHttpEndpoint({
        //   network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
        // }),
        endpoint:
          network === CHAIN.MAINNET
            ? TA_URL
            : 'https://testnet.toncenter.com/api/v2/',
        apiKey:
          '88d5912ad2394e5cbae97a351bb6a3e1174e09f7956d096beaae3acab91324da',
      });
    }, [network]),
  };
}
