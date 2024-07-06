import { CHAIN } from '@tonconnect/protocol';
import { Sender, SenderArguments } from '@ton/core';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        const tx = await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 10 * 60 * 1000, // 10 minutes for user to approve
        });
        console.log(tx);
      },
    },
    connected: !!wallet?.account.address,
    wallet: wallet?.account.address ?? null,
    network: wallet?.account.chain ?? null,
  };
}
