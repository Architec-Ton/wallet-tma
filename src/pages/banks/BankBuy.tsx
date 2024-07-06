import { useEffect } from 'react';
// import Column from '../../components/containers/Column';
import Page from '../../components/containers/Page';
import useLanguage from '../../hooks/useLanguage';
import { usePage } from '../../hooks/usePage';
import Delimiter from '../../components/typography/Delimiter';
// import SendAsset from '../swap/sendAsset';
import { AssetDataType } from '../swap';

import { useAppSelector } from '../../hooks/useAppDispatch';
import { selectAuthIsReady } from '../../features/auth/authSelector';
import { useApiGetBankBuyMutation } from '../../features/bank/bankApi';
// import AssetInput from '../../components/inputs/AssetInput';
// import { useTonClient } from '../../hooks/useTonClient';
import useContracts from '../../hooks/useContracts';
import { toNano } from '@ton/core';
import { useTon } from '../../hooks/useTon';

type SwapDataType = {
  send: AssetDataType;
  receive: AssetDataType;
};

// const swapData: SwapDataType = {
//   send: {
//     title: '',
//     balance: 0,
//     icon: '',
//     address: '',
//     value: '',
//   },
//   receive: {
//     title: '',
//     balance: 0,
//     icon: '',
//     address: '',
//     value: '',
//   } satisfies AssetDataType,
// };

function BankBuy() {
  const page = usePage();
  const isReady = useAppSelector(selectAuthIsReady);
  const t = useLanguage('bank-buy');
  // const [swapAssets, setSwappAssets] = useState(swapData);
  // const [sendAsset, setSendAsset] = useState<CoinDto | null>(null);
  // const [assets, setAssets] = useState<CoinDto[] | null>(null);
  const [bankBuyApi] = useApiGetBankBuyMutation();
  const ton = useTon();

  const contracts = useContracts();

  // const { client } = useTonClient();

  const handleInfo = async () => {
    try {
      const result = await bankBuyApi(null).unwrap();
      console.log('Bank result:', result);

      // setSendAsset(result.ton);
      const buyData: SwapDataType = {
        send: {
          title: result.ton.meta?.name || 'Ton',
          balance: result.ton.amount,
          icon: result.ton.meta?.image || '',
          address: '',
          value: '1.5',
        },
        receive: {
          title: '',
          balance: 0,
          icon: '',
          address: '',
          value: '',
        },
      };
      console.log('SwapDataType', buyData);
      // setSwappAssets(buyData);
    } catch (err) {
      console.error('Failed to get info: ', err);
    } finally {
      page.setLoading(false, true);
    }
  };

  useEffect(() => {
    console.log('isReady', isReady);
    if (isReady) handleInfo();
  }, [isReady]);

  useEffect(() => {
    page.setLoading(false);
  }, []);

  const handleBuyBank = async () => {
    console.log('call buy');
    if (ton.wallet.address) {
      const tx = await contracts.bank.buy(toNano(1.5));
      console.log('transaction:', tx);
    }
  };

  // const changeSendHandler = () => {};
  // const changeSendValue = () => {};
  // const chooseAssetHandler = (s: string) => () => {};
  // const changeReceiveHandler = () => {};

  return (
    <Page title={t('title')}>
      <Delimiter />
      {/* {sendAsset && <AssetInput asset={sendAsset} value="00" />} */}
      <Delimiter>
        {/* <img src={iconReverseButton} alt="" onClick={reverseSwaping} /> */}
      </Delimiter>
      {/* <ReceiveAsset
        asset={swapAssets.receive}
        onChange={changeReceiveHandler}
        onClick={chooseAssetHandler('receive')}
        value={swapAssets.receive.value || ''}
        coin={swapAssets.send}
        sendedCoin={swapAssets.send}
        disabled={false}
      /> */}
      <button className="primary-button" onClick={() => handleBuyBank()}>
        Buy 1 BNK
      </button>
    </Page>
  );
}

export default BankBuy;
