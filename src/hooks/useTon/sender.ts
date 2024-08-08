import type { Sender, SenderArguments } from "@ton/core";
import { Address, internal, toNano } from "@ton/core";

import {
  selectAddress,
  selectAddressPrivateKey, // selectAddressPublicKey,
  selectTonMode,
} from "../../features/ton/tonSelector";
import { TonConnectionMode, setExpiration, setSeqno } from "../../features/ton/tonSlice";
import type { RootState } from "../../store";
import type { TransactionDto } from "../../types/transaction";
import { decodePrivateKeyByPin } from "../../utils/pincode";
import { useAppDispatch, useAppSelector } from "../useAppDispatch";
import { useTmaMainButton } from "../useTma";
import { useTonClient } from "../useTonClient";
import { useTonConnect } from "./tonConnect";
import usePinCodeModalManagement from "./usePinCodeModal";
import useTrxModalManagement from "./useTrxModalManagment";

export const useSender = (): Sender => {
  const address = useAppSelector(selectAddress);
  const walletMode = useAppSelector(selectTonMode);
  const { sender } = useTonConnect();
  const privateHashKey = useAppSelector(selectAddressPrivateKey);
  // const publicKey = useAppSelector(selectAddressPublicKey);
  const client = useTonClient();
  const pincode = usePinCodeModalManagement();
  const trxModal = useTrxModalManagement();
  const btn = useTmaMainButton();
  const dispatch = useAppDispatch();

  const seqno = useAppSelector((state: RootState) => state.ton.seqno);

  const expiration = useAppSelector((state: RootState) => state.ton.expiration);

  const tonSend = async (args: SenderArguments, seqno: number | null): Promise<any> => {
    console.log("sender: ", args);

    if (expiration != null && new Date(expiration) > new Date()) {
      dispatch(
        showAlert({
          message:
            "The TON network cannot process multiple transactions at the same time. Please wait a bit and try again.",
          duration: 8000,
        }),
      );
      return;
    }

    btn.setVisible(false);

    if (privateHashKey === undefined) return;
    const pin = await pincode.open();

    if (pin === undefined) return;

    console.log("privateHashKeyL:", privateHashKey, pin);
    let keyPair: KeyPair | null = null;
    try {
      const mnemonics = decodePrivateKeyByPin(privateHashKey, pin);

      console.log("mnemonics:", mnemonics);

      keyPair = await mnemonicToPrivateKey(mnemonics);

      console.log("keyPair:", keyPair);
    } catch (e) {
      console.log(e);
      dispatch(showAlert({ message: `Pincode wrong. Try again`, duration: 8000 }));
      return;
    }
    const privateKey = keyPair.secretKey;
    const { publicKey } = keyPair;

    // Create wallet contract
    const workchain = 0; // Usually you need a workchain 0

    console.log("tonSend", publicKey, privateKey);

    if (publicKey && privateKey) {
      const wallet = WalletContractV4.create({
        workchain,
        publicKey,
      });

      try {
        if (client.client) {
          const contract = client.client?.open(wallet);

          // Get balance
          const balance: bigint = await contract.getBalance();

          // NOTE: Temporary check, for avoid infinite tries
          const isEnoughTONValue = balance - args.value > toNano(0.2);

          if (!isEnoughTONValue) {
            dispatch(
              showAlert({
                message:
                  "You have an insufficient amount of TON tokens to complete the transfer transaction, including blockchain fees",
                duration: 8000,
              }),
            );

            return;
          }

          // Create a transfer
          const seqno_current: number = await contract.getSeqno();

          if (seqno === seqno_current) {
            dispatch(
              showAlert({
                message:
                  "The TON network cannot process multiple transactions at the same time. Please wait a bit and try again.",
                duration: 8000,
              }),
            );
            return;
          }
          dispatch(setSeqno(seqno_current)), console.log("balance", balance);
          console.log("seqno", seqno, seqno_current);
          console.log("privateKey", privateKey);
          console.log("args", args);

          const transfer = await contract.createTransfer({
            seqno: seqno_current,
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

          console.log("Transfer", transfer.toBoc().toString("hex"));

          console.log("hash", transfer.hash().toString("hex"));
          console.log("Transfer2", transfer.toString("hex"));

          try {
            const trx = await contract.send(transfer);

            console.log("trx", trx);

            const hash = Buffer.from(`${args.to.toString()}.${seqno}`, "utf-8").toString("hex");

            const txModal = await trxModal.open(hash, {
              amount: Number(args.value / 1000_000n) / 1000,
              iconSrc: iconTon,
              symbol: "TON",
              utime: Math.floor(new Date().getTime() / 1000),
              source: wallet.address.toString(),
              destination: args.to.toString(),
              commissionAmount: 0.00247,
            } as TransactionDto);

            console.log("txModel:", txModal);
            dispatch(setExpiration());
          } catch (e) {
            if (e instanceof Error) dispatch(showAlert({ message: e.message, duration: 8000 }));
            return;
          }

          return transfer;
        }
      } catch (e) {
        if (e instanceof Error) dispatch(showAlert({ message: `${e.name} ${e.message}`, duration: 8000 }));
      }
    }

    // const signature: Buffer = sign(args.body?.hash(), privateKey);

    // // Body
    // const body = beginCell()
    //   .storeBuffer(signature)
    //   .storeBuilder(signingMessage)
    //   .endCell();
  };

  const commonSend = async (args: SenderArguments): Promise<void> => {
    if (walletMode === TonConnectionMode.tonconnect) {
      await sender.send(args);
    } else {
      await tonSend(args, seqno);
    }

    // TODO: open transaction screen here
  };

  return {
    address: address ? Address.parse(address) : undefined,
    send: commonSend,
  };
};
