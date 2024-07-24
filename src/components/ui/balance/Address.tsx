import { iconButtonCopy } from '../../../assets/icons/buttons';
import Row from '../../containers/Row';
import './Address.styles.css';
import {showAlert} from "../../../features/alert/alertSlice.ts";
import {useDispatch} from "react-redux";

type Props = {
  address?: string;
  copy?: boolean;
};

export const shortenString = (str: string): string => {
  if (str.length <= 10) {
    return str;
  }

  const prefix = str.slice(0, 6);
  const suffix = str.slice(-5);

  return `${prefix}....${suffix}`;
};

function Address({ address, copy=true }: Props) {
  const dispatch = useDispatch()
  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard
        .writeText(address)
          .then(() => {
              dispatch(showAlert({message: 'copy', duration: 1500}))
          })
        .catch((err) => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <Row className="address">
      <small>{address && shortenString(address)}</small>
        {copy && <a href="#" onClick={copyToClipboard}>
            <img src={iconButtonCopy}/>{' '}
        </a>}
    </Row>
  );
}

export default Address;
