import { ReactNode } from "react";
import "./Balance.styles.css";
import Section from "../../containers/Section";
import ListBlock from "../listBlock";
import {
  iconTon,
  iconTrxRecv,
  iconTrxSend,
  iconUsdt,
} from "../../../assets/icons/jettons";
import { AssetType } from "../../../pages/addCrypto/ReceiveAsset";
import { NavLink, useNavigate } from "react-router-dom";
import { useClosure } from "../../../hooks/useClosure";
import useLanguage from "../../../hooks/useLanguage";
import ListBaseItem from "../listBlock/ListBaseItem";
import ListTileItem from "../listBlock/ListTileItem";
import { TransactionHistoryItemDto } from "../../../types/history";
import { shortenString } from "./Address";

type Props = {
  children?: ReactNode;
  items: TransactionHistoryItemDto[];
};

function History({ children, items = [] }: Props) {
  //   const ton = useTon();
  const t = useLanguage("history");
  const navigate = useNavigate();

  const assetClickHandler = useClosure((asset: AssetType) => {
    navigate("/add-crypto/address", {
      state: asset,
    });
  });

  return (
    <Section title={t("title")} className="add-crypto__container">
      <ListBlock>
        {items.map((h, index) => {
          return (
            <ListTileItem
              key={index}
              icon={h.type == "in" ? iconTrxRecv : iconTrxSend}
              title={t(h.type)}
              description={shortenString(h.to)}
              // onClick={assetClickHandler(asset)}
            >
              <div className="list-block__right">
                <div
                  className={`list-block__title ${
                    h.type == "in" ? "change-up" : ""
                  } `}
                >{`${h.value} ${h.symbol}`}</div>
                <div className="list-block__description">
                  {new Date(h.utime * 1000).toLocaleString()}
                </div>
              </div>
            </ListTileItem>
          );
        })}
      </ListBlock>
      {children}
    </Section>
  );
}

export default History;
