import { Address, internal, Sender, SenderArguments } from "@ton/core";
import { useAppSelector } from "../useAppDispatch";
import {
  selectAddress,
  selectAddressPrivateKey,
  // selectAddressPublicKey,
  selectTonMode,
} from "../../features/ton/tonSelector";
import { TonConnectionMode } from "../../features/ton/tonSlice";
import { useTonConnect } from "./tonConnect";
import { WalletContractV4 } from "@ton/ton";
import { useTonClient } from "../useTonClient";
import usePinCodeModalManagement from "./usePinCodeModal";
import { decodePrivateKeyByPin } from "../../utils/pincode";
import { mnemonicToPrivateKey } from "@ton/crypto";

export const useSender = (): Sender => {
  const address = useAppSelector(selectAddress);
  const walletMode = useAppSelector(selectTonMode);
  const { sender } = useTonConnect();
  const privateHashKey = useAppSelector(selectAddressPrivateKey);
  // const publicKey = useAppSelector(selectAddressPublicKey);
  const client = useTonClient();
  const pincode = usePinCodeModalManagement();

  const tonSend = async (args: SenderArguments): Promise<void> => {
    console.log("sender: ", args);

    if (privateHashKey === undefined) return;
    const pin = await pincode.open();

    if (pin === undefined) return;

    console.log("privateHashKeyL:", privateHashKey, pin);

    const mnemonics = decodePrivateKeyByPin(privateHashKey, pin);

    console.log("mnemonics:", mnemonics);

    const keyPair = await mnemonicToPrivateKey(mnemonics);

    console.log("keyPair:", keyPair);

    const privateKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey;

    // Create wallet contract
    const workchain = 0; // Usually you need a workchain 0

    console.log("tonSend", publicKey, privateKey);

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

        console.log("balance", balance);
        console.log("seqno", seqno);
        console.log("privateKey", privateKey);
        console.log("args", args);

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

        console.log("Transfer", transfer);

        const trx = await contract.send(transfer);

        console.log("trx", trx);

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
