import { Address, internal, Sender, SenderArguments } from "@ton/core";
import { useAppDispatch, useAppSelector } from "../useAppDispatch";
import {
  selectAddress,
  selectAddressPrivateKey,
  // selectAddressPublicKey,
  selectTonMode,
} from "../../features/ton/tonSelector";
import {
  setExpiration,
  setSeqno,
  TonConnectionMode,
} from "../../features/ton/tonSlice";
import { useTonConnect } from "./tonConnect";
import { WalletContractV4 } from "@ton/ton";
import { useTonClient } from "../useTonClient";
import usePinCodeModalManagement from "./usePinCodeModal";
import { decodePrivateKeyByPin } from "../../utils/pincode";
import { KeyPair, mnemonicToPrivateKey } from "@ton/crypto";
import useTrxModalManagement from "./useTrxModalManagment";
import { TransactionDto } from "../../types/transaction";
import { iconTon } from "../../assets/icons/jettons";
import { RootState } from "../../store";
import { showAlert } from "../../features/alert/alertSlice";
import { useTmaMainButton } from "../useTma";

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

  const tonSend = async (
    args: SenderArguments,
    seqno: number | null
  ): Promise<any> => {
    console.log("sender: ", args);

    if (expiration != null && new Date(expiration) > new Date()) {
      dispatch(
        showAlert({
          message:
            "The TON network cannot process multiple transactions at the same time. Please wait a bit and try again.",
          duration: 8000,
        })
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
      dispatch(
        showAlert({ message: `Pincode wrong. Try again`, duration: 8000 })
      );
      return;
    }
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

      try {
        if (client.client) {
          const contract = client.client?.open(wallet);

          //Get balance
          const balance: bigint = await contract.getBalance();

          // Create a transfer
          const seqno_current: number = await contract.getSeqno();

          if (seqno == seqno_current) {
            dispatch(
              showAlert({
                message:
                  "The TON network cannot process multiple transactions at the same time. Please wait a bit and try again.",
                duration: 8000,
              })
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

            const hash = Buffer.from(
              `${args.to.toString()}.${seqno}`,
              "utf-8"
            ).toString("hex");

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
            if (e instanceof Error)
              dispatch(showAlert({ message: e.message, duration: 8000 }));
            return;
          }

          return transfer;
        }
      } catch (e) {
        if (e instanceof Error)
          dispatch(
            showAlert({ message: `${e.name} ${e.message}`, duration: 8000 })
          );
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

  const commonSend = async (args: SenderArguments): Promise<void> => {
    if (walletMode == TonConnectionMode.tonconnect) {
      await sender.send(args);
    } else {
      await tonSend(args, seqno);
    }

    //TODO: open transaction screen here
  };

  return {
    address: address ? Address.parse(address) : undefined,
    send: commonSend,
  };
};
