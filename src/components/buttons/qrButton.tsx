import { CSSProperties } from "react";
import "./Button.styles.css";
import classNames from "classnames";
import { useQRScanner } from "@tma.js/sdk-react";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectIsTma } from "../../features/tma/tmaSelector";

type Props = {
  icon?: string;
  title?: string;
  style?: CSSProperties;
  className?: string;
  onChange?: (qr: string | undefined) => void;
  disabled?: boolean;
};

function QrButtonTMA({ icon, title, style, className, onChange }: Props) {
  const qrScanner = useQRScanner();

  const onClick = () => {
    qrScanner
      .open({
        text: "Scan QR code",
      })
      .then((qr: string | null) => {
        console.log(qr);
        if (onChange && qr) onChange(qr);
      });
  };

  return (
    <a onClick={onClick} className={classNames(className, {})} style={style}>
      {icon && <img src={icon} alt={title} />}
      {title && <div>{title}</div>}
    </a>
  );
}

function QrButton({ icon, title, onChange }: Props) {
  const isTma = useAppSelector(selectIsTma);

  if (isTma)
    return <QrButtonTMA icon={icon} title={title} onChange={onChange} />;

  return <></>;
}

export default QrButton;
