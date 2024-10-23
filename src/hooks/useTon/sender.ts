import type { Sender, SenderArguments } from "@ton/core";
import { Address, internal } from "@ton/core";
import type { KeyPair } from "@ton/crypto";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
import { showWarningAlert } from "features/alert/alertSlice";
import {
  selectAddress,
  selectAddressPrivateKey, // selectAddressPublicKey,
  selectTonMode,
} from "features/ton/tonSelector";
import { TonConnectionMode, setExpiration, setSeqno } from "features/ton/tonSlice";
import type { TransactionDto } from "types/transaction";

import { iconTon } from "assets/icons/jettons";

import { decodePrivateKeyByPin } from "utils/pincode";

import type { RootState } from "../../store";
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
  const { client } = useTonClient();
  const pincode = usePinCodeModalManagement();
  const trxModal = useTrxModalManagement();
  const btn = useTmaMainButton();
  const dispatch = useAppDispatch();

  const seqno = useAppSelector((state: RootState) => state.ton.seqno);

  const expiration = useAppSelector((state: RootState) => state.ton.expiration);

  const tonSend = async (args: SenderArguments, seqno: number | null): Promise<any> => {
    if (expiration != null && new Date(expiration) > new Date()) {
      dispatch(
        showWarningAlert({
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

    let keyPair: KeyPair | null = null;
    try {
      const mnemonics = decodePrivateKeyByPin(privateHashKey, pin);

      keyPair = await mnemonicToPrivateKey(mnemonics);
    } catch (e) {
      console.error(e);
      dispatch(showWarningAlert({ message: `Pincode wrong. Try again`, duration: 8000 }));
      return;
    }
    const privateKey = keyPair.secretKey;
    const { publicKey } = keyPair;

    // Create wallet contract
    const workchain = 0; // Usually you need a workchain 0

    if (publicKey && privateKey) {
      const wallet = WalletContractV4.create({
        workchain,
        publicKey,
      });

      try {
        if (!client) {
          dispatch(
            showWarningAlert({
              message: "Transaction failed",
              duration: 8000,
            }),
          );
        } else {
          const contract = client?.open(wallet);

          // Get balance
          const balance: bigint = await contract.getBalance();

          // Create a transfer
          const seqno_current: number = await contract.getSeqno();

          if (seqno === seqno_current) {
            dispatch(
              showWarningAlert({
                message:
                  "The TON network cannot process multiple transactions at the same time. Please wait a bit and try again.",
                duration: 8000,
              }),
            );
            return;
          }
          dispatch(setSeqno(seqno_current));

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

          try {
            const trx = await contract.send(transfer);

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

            dispatch(setExpiration());
          } catch (e) {
            if (e instanceof Error) dispatch(showWarningAlert({ message: e.message, duration: 8000 }));
            return;
          }

          return transfer;
        }
      } catch (e) {
        if (e instanceof Error) dispatch(showWarningAlert({ message: `${e.name} ${e.message}`, duration: 8000 }));
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
