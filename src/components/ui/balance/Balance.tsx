import { ReactNode, useEffect, useState } from "react";
import Column from "../../containers/Column";
import Row from "../../containers/Row";
import Block from "../../typography/Block";

import "./Balance.styles.css";
import { WalletInfoData } from "../../../types/wallet";
import Address from "./Address";
import QrButton from "../../buttons/qrButton";
import { Address as Addr } from "@ton/core";
import useRouter from "../../../hooks/useRouter";
import { iconInputScan } from "../../../assets/icons/inputs";
import { parseTonTransferUrl } from "../../../utils/formatter";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { showAlert } from "../../../features/alert/alertSlice";

type Props = {
  walletInfoData: WalletInfoData | null;
  children?: ReactNode;
};

function Balance({ children, walletInfoData }: Props) {
  const [qrText, setQrText] = useState<string | undefined>();
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (qrText) {
        const address = parseTonTransferUrl(qrText);
        if (address) {
          Addr.parse(address);
          navigate("/send", { state: address });
        }
      }
    } catch (e) {
      console.log("Wrong link");
      dispatch(showAlert({ message: `Can not parse qr code`, duration: 8000 }));
    }
  }, [qrText]);

  return (
    <Block className="balance-block space-between">
      <Column className="w-100">
        <Row className="space-between">
          <div className="balance-block-value">
            {walletInfoData &&
              `$ ${walletInfoData.wallets[
                walletInfoData.currentWallet
              ].usdPrice.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}`}
          </div>
          <div>
            <QrButton
              icon={iconInputScan}
              onChange={(s: string | undefined) => setQrText(s)}
            />
          </div>
          {/* <h1>
            <span>Wallet</span> Architec.TON
          </h1>
          <div>...</div> */}
        </Row>

        {children}
      </Column>
      <Address
        address={
          walletInfoData
            ? walletInfoData.wallets[
                walletInfoData.currentWallet
              ].address.toString()
            : undefined
        }
      />
    </Block>
  );
}

export default Balance;
