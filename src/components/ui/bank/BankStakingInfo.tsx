// import useLanguage from '../../../hooks/useLanguage';
import Row from '../../containers/Row.tsx';
import ListBaseItem from '../listBlock/ListBaseItem.tsx';
import ListBlock from '../listBlock/index.tsx';

import "./BankStakingInfo.styles.css"

export interface InfoItems {
  title: string;
  value: string | React.ReactNode;
}

type OwnProps = {
  infoItems: InfoItems[] | undefined
}

function BankStakingInfo({ infoItems }: OwnProps) {
  //   const t = useLanguage('bank-staking');

  if (!infoItems) {
    return null
  }

  return (
    <ListBlock>
      {infoItems.map((item, index) => (
        <ListBaseItem key={index}>
          <Row className="space-between w-100">
            <div className="nowrap">{item.title}</div>
            <div>{item.value}</div>
          </Row>
        </ListBaseItem>
      ))}
    </ListBlock>
  );
}

export default BankStakingInfo;
