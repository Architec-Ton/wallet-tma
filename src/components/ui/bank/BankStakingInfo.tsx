// import useLanguage from '../../../hooks/useLanguage';
import Row from '../../containers/Row.tsx';
import ListBaseItem from '../listBlock/ListBaseItem.tsx';
import ListBlock from '../listBlock/index.tsx';

import "./BankStakingInfo.styles.css"

function BankStakingInfo() {
  //   const t = useLanguage('bank-staking');

  const infoItems = [
    {
      title: 'Available balance',
      value: '100 BNK',
    },
    {
      title: 'Min deposit',
      value: '1 BNK',
    },
    {
      title: 'Staking period',
      value: '30d',
    },
    {
      title: 'Your rewards',
      value: '1000 ARCH',
    },
  ];

  return (
    <ListBlock>
      {infoItems.map((item, index) => (
        <ListBaseItem key={index}>
          <Row className="space-between w-100">
            <div>{item.title}</div>
            <div>{item.value}</div>
          </Row>
        </ListBaseItem>
      ))}
    </ListBlock>
  );
}

export default BankStakingInfo;
