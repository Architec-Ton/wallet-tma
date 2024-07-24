import { iconGlobalButton } from "../../../../assets/icons/buttons";
// import { iconTon, iconUsdt } from "../../../../assets/icons/jettons"
import useLanguage from "../../../../hooks/useLanguage";
import Column from "../../../containers/Column";
import Row from "../../../containers/Row";
import InlineLoader from "../../inlineLoader";
import Modal from "../../modal";

import "./index.css";
import { TransactionDto } from "../../../../types/transaction";
import ListItem from "../../listBlock/ListItem";
import { ItemDto } from "../../../../types/list";
import { shortenString } from "../../balance/Address";

type TransactionModalPropsType = {
  onClose?: () => void;
  trx: TransactionDto | undefined;
  children?: React.ReactNode;
};

const TransactionModal = ({
  onClose,
  trx,
}: // children,
TransactionModalPropsType) => {
  const t = useLanguage("transaction");

  const items = [
    {
      title: t("sender-address"),
      value: shortenString(trx?.source || ""),
    },
    {
      title: t("recipient"),
      value: shortenString(trx?.destination || ""),
    },
    {
      title: t("commission"),
      value:
        trx && trx?.commissionAmount
          ? `${trx?.commissionAmount?.toLocaleString(undefined, {
              maximumFractionDigits: 5,
            })} ${trx?.symbol}`
          : "",
      subvalue:
        trx && trx?.commissionUsd
          ? `${trx?.commissionUsd?.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}`
          : "",
    },
    {
      title: t("comment"),
      value: trx?.comment,
    },
  ] as ItemDto[];

  return (
    <Modal onClose={onClose}>
      <Column className="transaction-data">
        <Row>
          {trx && trx.iconSrc && <img src={trx.iconSrc} />}
          {trx && trx.iconDst && <img src={trx.iconDst} />}
        </Row>

        {trx && trx.amount && (
          <>
            <div>
              {trx.amount.toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })}{" "}
              {trx.symbol}
            </div>
            <div className="secondary-data">
              {trx.amountUsd &&
                trx.amountUsd.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
            </div>
          </>
        )}
        {trx && trx.utime && (
          <div className="secondary-data">
            {new Date(trx.utime * 1000).toLocaleString()}
          </div>
        )}
        {(!trx || !trx.status) && (
          <Row className="process">
            <InlineLoader />
            <div>{t("loading")}</div>
          </Row>
        )}
      </Column>
      <ListItem items={items}></ListItem>
      {trx && trx.hash && (
        <button className="rounded-button control-button transaction-button">
          <Row>
            <img src={iconGlobalButton} alt="" />
            <span>{t("page-title")}</span>
          </Row>
        </button>
      )}
    </Modal>
  );
};

export default TransactionModal;
