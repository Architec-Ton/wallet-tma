import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";

import { TON_CLIENT_NETWORK } from "../constants";
import { useAsyncInitialize } from "./useAsyncInitialize";

// Quick fix with orbs problem
//TODO: move to redux
declare global {
  var ep: string;
}
var ep: string;

const endpointPromise = getHttpEndpoint({
  network: TON_CLIENT_NETWORK,
});

export function useTonClient() {
  const client = useAsyncInitialize(async (): Promise<TonClient> => {
    if (!globalThis.ep) {
      ep = await endpointPromise;
      console.log("ep:", globalThis.ep);
    }
    return new TonClient({
      endpoint: globalThis.ep, // "https://tonb.architecton.site/jsonRPC/",
      // await endpointPromise,
      // apiKey: TONAPI_KEY,
    });
  }, []);

  return {
    client, // TON_CLIENT_NETWORK === "mainnet" ? mainnet : testnet,
    network: TON_CLIENT_NETWORK,
  };
}
