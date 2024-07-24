import { Address, internal, Sender, SenderArguments } from '@ton/core';
import { useAppSelector } from '../useAppDispatch';
import {
  selectAddress,
  selectAddressPrivateKey,
  // selectAddressPublicKey,
  selectTonMode,
} from '../../features/ton/tonSelector';
import { TonConnectionMode } from '../../features/ton/tonSlice';
import { useTonConnect } from './tonConnect';
import { WalletContractV4 } from '@ton/ton';
import { useTonClient } from '../useTonClient';
import usePinCodeModalManagement from './usePinCodeModal';
import { decodePrivateKeyByPin } from '../../utils/pincode';
import { mnemonicToPrivateKey } from '@ton/crypto';
import useTrxModalManagement from './useTrxModalManagment';
import { TransactionDto } from '../../types/transaction';
import { iconTon } from '../../assets/icons/jettons';

export const useSender = (): Sender => {
  const address = useAppSelector(selectAddress);
  const walletMode = useAppSelector(selectTonMode);
  const { sender } = useTonConnect();
  const privateHashKey = useAppSelector(selectAddressPrivateKey);
  // const publicKey = useAppSelector(selectAddressPublicKey);
  const client = useTonClient();
  const pincode = usePinCodeModalManagement();
  const trxModal = useTrxModalManagement();

  const tonSend = async (args: SenderArguments): Promise<any> => {
    console.log('sender: ', args);

    if (privateHashKey === undefined) return;
    const pin = await pincode.open();

    if (pin === undefined) return;

    console.log('privateHashKeyL:', privateHashKey, pin);

    const mnemonics = decodePrivateKeyByPin(privateHashKey, pin);

    console.log('mnemonics:', mnemonics);

    const keyPair = await mnemonicToPrivateKey(mnemonics);

    console.log('keyPair:', keyPair);

    const privateKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey;

    // Create wallet contract
    const workchain = 0; // Usually you need a workchain 0

    console.log('tonSend', publicKey, privateKey);

    if (publicKey && privateKey) {
      const wallet = WalletContractV4.create({
        workchain,
        publicKey: publicKey,
      });

      if (client.client) {
        const contract = client.client?.open(wallet);

        //Get balance
        const balance: bigint = await contract.getBalance();

        // Create a transfer
        const seqno: number = await contract.getSeqno();

        console.log('balance', balance);
        console.log('seqno', seqno);
        console.log('privateKey', privateKey);
        console.log('args', args);

        const transfer = await contract.createTransfer({
          seqno,
          secretKey: privateKey,
          sendMode: args.sendMode,
          messages: [
            internal({
              value: args.value,
              to: args.to,
              body: args.body,
            }),
          ],
        });

        console.log('Transfer', transfer.toBoc().toString('hex'));

        console.log('hash', transfer.hash().toString('hex'));
        console.log('Transfer2', transfer.toString('hex'));

        const trx = await contract.send(transfer);

        console.log('trx', trx);

        const hash = Buffer.from(
          `${args.to.toString()}.${seqno}`,
          'utf-8'
        ).toString('hex');

        const txModal = await trxModal.open(hash, {
          amount: Number(args.value / 1000_000n) / 1000,
          iconSrc: iconTon,
          symbol: 'TON',
          utime: Math.floor(new Date().getTime() / 1000),
          source: wallet.address.toString(),
          destination: args.to.toString(),
          commissionAmount: 0.00247,
        } as TransactionDto);

        console.log('txModel:', txModal);

        return transfer;
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

  const commonSend = async (args: SenderArguments): Promise<void> => {
    const commonSender =
      walletMode == TonConnectionMode.tonconnect ? sender.send : tonSend;

    console.log('Run sender: ', args);
    // SEND: transaction to backend

    const trx = await commonSender(args);

    //TODO: open transaction screen here

    return trx; //boc
  };

  return {
    address: address ? Address.parse(address) : undefined,
    send: commonSend,
  };
};
