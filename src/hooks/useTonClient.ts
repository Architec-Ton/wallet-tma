import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";

import { TONAPI_KEY, TON_CLIENT_NETWORK } from "../constants";
import { useAsyncInitialize } from "./useAsyncInitialize";

export function useTonClient() {
  const testnet = useAsyncInitialize(async (): Promise<TonClient> => new TonClient({
      endpoint: await getHttpEndpoint({
        network: "testnet",
      }),
      //apiKey: TONAPI_KEY,
    }));
  const mainnet = useAsyncInitialize(async (): Promise<TonClient> => new TonClient({
      endpoint: await getHttpEndpoint({
        network: "mainnet",
      }),
      //apiKey: TONAPI_KEY,
    }));

  return {
    testnet,
    mainnet,
    client: TON_CLIENT_NETWORK === "mainnet" ? mainnet : testnet,
    network: TON_CLIENT_NETWORK,
  };
}
