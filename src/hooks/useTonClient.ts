import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { TON_CLIENT_NETWORK, TONAPI_KEY } from "../constants";
import { useAsyncInitialize } from "./useAsyncInitialize";

export function useTonClient() {
  const testnet = useAsyncInitialize(async (): Promise<TonClient> => {
    return new TonClient({
      endpoint: await getHttpEndpoint({
        network: "testnet",
      }),
      apiKey: TONAPI_KEY,
    });
  });
  const mainnet = useAsyncInitialize(async (): Promise<TonClient> => {
    return new TonClient({
      endpoint: await getHttpEndpoint(),
      apiKey: TONAPI_KEY,
    });
  });

  return {
    testnet: testnet,
    mainnet: mainnet,
    client: testnet,
    network: TON_CLIENT_NETWORK,
  };
}
