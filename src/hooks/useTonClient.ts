import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";

import { TON_CLIENT_NETWORK } from "../constants";
import { useAsyncInitialize } from "./useAsyncInitialize";

const endpointPromise = getHttpEndpoint({
  network: TON_CLIENT_NETWORK,
});

export function useTonClient() {
  const client = useAsyncInitialize(
    async (): Promise<TonClient> =>
      new TonClient({
        endpoint: await endpointPromise,
        // apiKey: TONAPI_KEY,
      }),
    [],
  );

  return {
    client, // TON_CLIENT_NETWORK === "mainnet" ? mainnet : testnet,
    network: TON_CLIENT_NETWORK,
  };
}
