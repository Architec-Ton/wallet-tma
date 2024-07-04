//import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from '@ton/ton';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { CHAIN } from '@tonconnect/protocol';
import { getHttpEndpoint } from '@orbs-network/ton-access';

export function useTonClient() {
  const { network } = useTonConnect();

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;
      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
        }),
        // endpoint:
        //   network === CHAIN.MAINNET
        //     ? 'https://ton.architecton.site/api/v2/'
        //     : 'https://testnet.toncenter.com/api/v2/',
        apiKey:
          '88d5912ad2394e5cbae97a351bb6a3e1174e09f7956d096beaae3acab91324da',
      });
    }, [network]),
  };
}
