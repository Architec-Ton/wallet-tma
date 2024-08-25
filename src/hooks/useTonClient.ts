import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";

import { TON_CLIENT_NETWORK } from "../constants";
import { useAsyncInitialize } from "./useAsyncInitialize";

export function useTonClient() {
  const client = useAsyncInitialize(async (): Promise<TonClient> => new TonClient({
      endpoint: await getHttpEndpoint({
        network: TON_CLIENT_NETWORK,
      }),
      //apiKey: TONAPI_KEY,
    }));
  // const mainnet = useAsyncInitialize(async (): Promise<TonClient> => new TonClient({
  //     endpoint: await getHttpEndpoint({
  //       network: "mainnet",
  //     }),
  //     //apiKey: TONAPI_KEY,
  //   }));

  return {
    testnet: client,
    mainnet: client,
    client: client , //TON_CLIENT_NETWORK === "mainnet" ? mainnet : testnet,
    network: TON_CLIENT_NETWORK,
  };
}
