import { iconButtonCopy } from '../../../assets/icons/buttons';
import Row from '../../containers/Row';
import './Address.styles.css';

type Props = {
  address?: string;
};

export const shortenString = (str: string): string => {
  if (str.length <= 10) {
    return str;
  }

  const prefix = str.slice(0, 6);
  const suffix = str.slice(-5);

  return `${prefix}....${suffix}`;
};

function Address({ address }: Props) {
  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard
        .writeText(address)
        .catch((err) => console.error('Failed to copy text: ', err));
    }
  };

  return (
    <Row className="address">
      <small>{address && shortenString(address)}</small>
      <a href="#" onClick={copyToClipboard}>
        <img src={iconButtonCopy} />{' '}
      </a>
    </Row>
  );
}

export default Address;
