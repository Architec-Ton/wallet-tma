import { Address, internal, Sender, SenderArguments } from '@ton/core';
import { useAppSelector } from '../useAppDispatch';
import {
  selectAddress,
  selectAddressPrivateKey,
  selectAddressPublicKey,
  selectTonMode,
} from '../../features/ton/tonSelector';
import { TonConnectionMode } from '../../features/ton/tonSlice';
import { useTonConnect } from './tonConnect';
import { WalletContractV4 } from '@ton/ton';
import { useTonClient } from '../useTonClient';

export const useSender = (): Sender => {
  const address = useAppSelector(selectAddress);
  const walletMode = useAppSelector(selectTonMode);
  const { sender } = useTonConnect();
  const privateHashKey = useAppSelector(selectAddressPrivateKey);
  const publicKey = useAppSelector(selectAddressPublicKey);
  const client = useTonClient();

  const privateKey = privateHashKey;

  const tonSend = async (args: SenderArguments): Promise<void> => {
    // Create wallet contract
    const workchain = 0; // Usually you need a workchain 0

    if (publicKey && privateKey) {
      const wallet = WalletContractV4.create({
        workchain,
        publicKey: Buffer.from(publicKey, 'hex'),
      });

      if (client.client) {
        const contract = client.client?.open(wallet);

        // Get balance
        //   const balance: bigint = await contract.getBalance();

        // Create a transfer
        const seqno: number = await contract.getSeqno();
        const transfer = await contract.createTransfer({
          seqno,
          secretKey: Buffer.from(privateKey, 'hex'),
          sendMode: args.sendMode,
          messages: [
            internal({
              value: args.value,
              to: args.to,
              body: args.body,
            }),
          ],
        });

        console.log('Transfer', transfer);

        return;
      }
    }

    // const signature: Buffer = sign(args.body?.hash(), privateKey);

    // // Body
    // const body = beginCell()
    //   .storeBuffer(signature)
    //   .storeBuilder(signingMessage)
    //   .endCell();

    return;
  };

  if (walletMode == TonConnectionMode.tonconnect) return sender;

  return {
    address: address ? Address.parse(address) : undefined,
    send: tonSend,
  };
};
