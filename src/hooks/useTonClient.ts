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
        endpoint:
          TON_CLIENT_NETWORK === "mainnet"
            ? "https://toncenter.com/api/v2/jsonRPC"
            : "https://testnet.toncenter.com/api/v2/jsonRPC",
        // await endpointPromise,
        // apiKey: TONAPI_KEY,
      }),
    [],
  );

  return {
    client, // TON_CLIENT_NETWORK === "mainnet" ? mainnet : testnet,
    network: TON_CLIENT_NETWORK,
  };
}
