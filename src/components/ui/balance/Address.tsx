import './Address.styles.css';
import Row from '../../containers/Row';

type Props = {
  address?: string;
};

function Address({ address }: Props) {
  return (
    <Row className="address">
      <small>{address}</small>
      <img src="" />
    </Row>
  );
}

export default Address;
