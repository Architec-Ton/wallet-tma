import { useMemo, useEffect, useState, ChangeEventHandler } from 'react';
import Page from '../../components/containers/Page';
import Section from '../../components/containers/Section';
import Delimiter from '../../components/typography/Delimiter';
import Row from '../../components/containers/Row';
import { iconReverseButton } from '../../assets/icons/buttons';
// import { iconPepe, iconTon, iconUsdt } from '../../assets/icons/jettons';
import SendAsset from './sendAsset';
import ReceiveAsset from './receiveAsset';
import AssetsList from './assetsList';
import { AddressType, DEX, pTON } from '@ston-fi/sdk';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useClosure } from '../../hooks/useClosure';
import ModalPinCode from '../../components/ui/modals/modalPinCode';
import TransactionModal from '../../components/ui/modals/transactionModal';
import { useApiWalletInfoMutation } from '../../features/wallet/walletApi';
import { WalletInfoData } from '../../types/wallet';
import TransactionCompleteModal from '../../components/ui/modals/transactionCompleteModal';
import { CoinDto } from '../../types/assest';
import { useTonClient } from '../../hooks/useTonClient';
import { toNano } from '@ton/core';

import './index.css';
import useLanguage from '../../hooks/useLanguage';
import { usePage } from '../../hooks/usePage';
import { useTmaMainButton } from '../../hooks/useTma';
import { initialAssets } from '../../mocks/mockAssets';

export type AssetDataType = {
  title: string;
  icon: string;
  balance: number;
  value?: string;
  address?: string;
};

export type JetonWalletType = {
  address: string;
  balance: string;
  owner: string;
  jetton: string;
  last_transaction_lt: string;
  code_hash: string;
  data_hash: string;
};

type SwapDataType = {
  send: AssetDataType;
  receive: AssetDataType;
};

const swapData: SwapDataType = {
  send: {
    title: '',
    balance: 0,
    icon: '',
    address: '',
    value: '',
  },
  receive: {
    title: '',
    balance: 0,
    icon: '',
    address: '',
    value: '',
  } satisfies AssetDataType,
};


const Swap = () => {
  const [swapAssets, setSwappAssets] = useState(swapData);
  const [showAssetsList, setShowAssetsList] = useState(false);
  const [swappingTokenMode, setSwappingTokenMode] = useState<
    'send' | 'receive' | null
  >(null);
  const [showPinCode, setShowPinCode] = useState<boolean>(false);
  const [showTransaction, setShowTransaction] = useState<boolean>(false);
  const [showTransactionComplete, setShowTransactionComplete] =
    useState<boolean>(false);
  const [isTransactionInProgress, setIsTransactionInProgress] =
    useState<boolean>(false);
  const [assets, setAssets] = useState<CoinDto[] | null>(null);
  const page = usePage();
  const btn = useTmaMainButton();

  const [tonConnectUI] = useTonConnectUI();
  const { client: tonClient } = useTonClient();
  const wallet = useTonAddress();
  const [walletInfoApi] = useApiWalletInfoMutation();
  const t = useLanguage('swap');

  useEffect(() => {
    walletInfoApi(null)
      .unwrap()
      .then((result: WalletInfoData) => {
        const { assets } = result.wallets[result.currentWallet];
        setAssets(assets);
        page.setLoading(false);
        btn.init(t('page-title'), swapHanler, true);
      })
      .catch(() => {
        setAssets(initialAssets);
        page.setLoading(false);
      });
  }, []);

  const sendingAsset = useMemo(() => {
    if (assets) {
      return assets.find(
        (asset) => asset.meta?.address === swapAssets.send.address
      );
    }
  }, [swapAssets.send.address]);

  const receivingAsset = useMemo(() => {
    if (assets) {
      return assets.find(
        (asset) => asset.meta?.address === swapAssets.receive.address
      );
    }
  }, [swapAssets.receive.address]);

  const calculateSwappValues = (
    value: number | string,
    mode: 'send' | 'receive'
  ) => {
    const _value = Number(value);
    if (mode === 'send') {
      return receivingAsset
        ? (Number(sendingAsset?.usdPrice) * _value) /
            Number(receivingAsset?.usdPrice)
        : undefined;
    }
    if (mode === 'receive') {
      return sendingAsset
        ? (Number(receivingAsset?.usdPrice) * _value) /
            Number(sendingAsset?.usdPrice)
        : undefined;
    }
  };

  const reverseSwaping = () => {
    setSwappAssets((prevData) => {
      const { send, receive } = prevData;
      return { send: receive, receive: send };
    });
  };

  const changeReceiveValue = (value: string) => {
    setSwappAssets(({ send, receive }) => {
      const sendedValue = calculateSwappValues(value, 'receive') || '';
      return {
        send: { ...send, value: sendedValue?.toString() },
        receive: { ...receive, value },
      } satisfies SwapDataType;
    });
  };

  const changeReceiveHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeReceiveValue(e.currentTarget.value);
  };

  const changeSendValue = (value: string) => {
    const receivedValue = calculateSwappValues(value, 'send') || '';
    setSwappAssets(({ send, receive }) => {
      return {
        send: { ...send, value },
        receive: { ...receive, value: receivedValue?.toString() },
      } satisfies SwapDataType;
    });
  };

  const changeSendHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeSendValue(e.currentTarget.value);
  };

  const chooseAssetHandler = useClosure((mode: 'send' | 'receive') => {
    setSwappingTokenMode(mode);
    setShowAssetsList(true);
  });

  const closeAssetsList = () => {
    setSwappingTokenMode(null);
    setShowAssetsList(false);
  };

  const setJeton = (asset: CoinDto) => {
    setSwappAssets(({ send, receive }) => {
      if (swappingTokenMode === 'send') {
        const sendedValue =
          (Number(receivingAsset?.usdPrice) * Number(receive.value)) /
            asset.usdPrice || '';
        return {
          send: {
            title: asset.meta?.symbol as string,
            balance: asset.amount ?? 0,
            icon: asset.meta?.image as string,
            address: asset.meta?.address,
            value: sendedValue.toString(),
          },
          receive,
        } satisfies SwapDataType;
      } else {
        const receivedValue =
          (Number(sendingAsset?.usdPrice) * Number(send.value)) /
            asset.usdPrice || '';
        return {
          send,
          receive: {
            title: asset.meta?.symbol as string,
            balance: asset.amount ?? 0,
            icon: asset.meta?.image as string,
            address: asset.meta?.address,
            value: receivedValue.toString(),
          },
        } satisfies SwapDataType;
      }
    });
    setShowAssetsList(false);
  };

  const swapHanler = () => {
    setShowPinCode(true);
  };

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 10000);
    });
  };

  const onPinSuccess = () => {
    setShowPinCode(false);
    setShowTransaction(true);
  };

  const transactionSuccessHandler = async () => {
    setIsTransactionInProgress(true);
    const types = [sendingAsset?.type, receivingAsset?.type];
    try {
      if (types.includes('ton')) {
        types[0] === 'ton'
          ? await tonToJettonTransaction()
          : await jettonToTonTransaction();
      } else {
        await jettonToJettonTransaction();
      }
      await delay();
      setIsTransactionInProgress(false);
      setShowTransaction(false);
      setShowTransactionComplete(true);
    } catch (e) {
      console.error(e);
      await delay();
      setIsTransactionInProgress(false);
      setShowTransaction(false);
    }
  };

  const jettonToTonTransaction = async () => {
    if (!tonClient) {
      throw new Error("TonClient doesn't exists");
    }
    const router = tonClient.open(new DEX.v1.Router());

    const swapTxParams = await router.getSwapJettonToTonTxParams({
      userWalletAddress: wallet,
      offerJettonAddress: sendingAsset?.meta?.address as AddressType,
      offerAmount: toNano(
        Number(swapAssets.send.value) *
          Math.pow(10, sendingAsset?.meta?.decimals as number)
      ),
      proxyTon: new pTON.v1(),
      minAskAmount: toNano(
        Math.round((Number(swapAssets.receive.value) + 0.17) * -1e9)
      ),
    });

    await tonConnectUI.sendTransaction({
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: swapTxParams.to.toString(),
          amount: swapTxParams.value.toString(),
          payload: swapTxParams.body?.toBoc().toString('base64'),
        },
      ],
    });
  };

  const jettonToJettonTransaction = async () => {
    if (!tonClient) {
      throw new Error("TonClient doesn't exists");
    }
    const router = tonClient.open(new DEX.v1.Router());

    const swapTxParams = await router.getSwapJettonToJettonTxParams({
      userWalletAddress: wallet,
      offerJettonAddress: sendingAsset?.meta?.address as AddressType,
      offerAmount: toNano(
        Number(swapAssets.send.value) *
          Math.pow(10, sendingAsset?.meta?.decimals as number)
      ),
      askJettonAddress: receivingAsset?.meta?.address as AddressType,
      minAskAmount: toNano(
        Math.round((Number(swapAssets.receive.value) + 0.22) * -1e9)
      ),
    });

    await tonConnectUI.sendTransaction({
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: swapTxParams.to.toString(),
          amount: swapTxParams.value.toString(),
          payload: swapTxParams.body?.toBoc().toString('base64'),
        },
      ],
    });
  };

  const tonToJettonTransaction = async () => {
    if (!tonClient) {
      throw new Error("TonClient doesn't exists");
    }
    const router = tonClient.open(new DEX.v1.Router());

    const swapTxParams = await router.getSwapTonToJettonTxParams({
      userWalletAddress: wallet,
      askJettonAddress: receivingAsset?.meta?.address as AddressType,
      offerAmount: toNano(
        Number(swapAssets.send.value) *
          Math.pow(10, sendingAsset?.meta?.decimals as number)
      ),
      proxyTon: new pTON.v1(),
      minAskAmount: toNano(
        Math.round((Number(swapAssets.receive.value) + 0.185) * -1e9)
      ),
    });

    await tonConnectUI.sendTransaction({
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: swapTxParams.to.toString(),
          amount: swapTxParams.value.toString(),
          payload: swapTxParams.body?.toBoc().toString('base64'),
        },
      ],
    });
  };

  const [isValidSwapp, setIsValidSwapp] = useState<boolean>(false);

  useEffect(() => {
    const isValid: boolean =
      !!sendingAsset &&
      !!receivingAsset &&
      sendingAsset.amount > 0 &&
      sendingAsset.amount - Number(swapAssets.send.value) > 0 &&
      !!swapAssets.send.value &&
      !!swapAssets.receive.value;
    setIsValidSwapp(isValid);
  }, [sendingAsset, receivingAsset, swapAssets]);

  useEffect(() => {
    btn.setVisible(isValidSwapp);
  }, [isValidSwapp]);

  return (
    <Page title={t('page-title')} className="swap">
      <Delimiter />
      <SendAsset
        asset={swapAssets.send}
        onChange={changeSendHandler}
        forceChange={changeSendValue}
        onClick={chooseAssetHandler('send')}
        value={swapAssets.send.value || ''}
        coin={sendingAsset}
        disabled={!sendingAsset || !receivingAsset || sendingAsset.amount <= 0}
      />
      <Delimiter>
        <img src={iconReverseButton} alt="" onClick={reverseSwaping} />
      </Delimiter>
      <ReceiveAsset
        asset={swapAssets.receive}
        onChange={changeReceiveHandler}
        onClick={chooseAssetHandler('receive')}
        value={swapAssets.receive.value || ''}
        coin={receivingAsset}
        sendedCoin={sendingAsset}
        disabled={!sendingAsset || !receivingAsset || sendingAsset.amount <= 0}
      />

      <Section>
        <Delimiter />
        <Row className="justify-between swap-info-row">
          <div>{t('receive-value-title')}</div>
          <div>
            {sendingAsset &&
              receivingAsset &&
              (
                (Number(swapAssets.send.value) - 0.17) *
                sendingAsset.usdPrice
              ).toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })}
          </div>
        </Row>
        <Delimiter />
        <Row className="justify-between swap-info-row">
          <div>{t('route')}</div>
          {sendingAsset && receivingAsset && (
            <div>
              {sendingAsset?.meta?.symbol} {'»'} {receivingAsset?.meta?.symbol}
            </div>
          )}
        </Row>
        <Delimiter />
      </Section>
      {/* <button
        className="primary-button rounded-button large-button"
        onClick={swapHanler}
        disabled={!isValidSwapp}>
        {t('page-title')}
      </button> */}
      {showAssetsList && (
        <AssetsList
          onClose={closeAssetsList}
          onJetonSelect={setJeton}
          assets={assets}
          excludeAssets={{ send: sendingAsset, receive: receivingAsset }}
        />
      )}
      {showPinCode && (
        <ModalPinCode onSuccess={onPinSuccess} mode="confirmation" />
      )}
      {showTransaction && (
        <TransactionModal
          from={sendingAsset}
          to={receivingAsset}
          sendedValue={swapAssets.send.value as string}
          receivedValue={swapAssets.receive.value as string}
          commission={0.17}
          returnValue={0.125}
          address={swapAssets.receive.address as string}
          transactionData={new Date()}
          transactionType={t('page-title')}
          onClose={() => setShowTransaction(false)}
          onSuccess={transactionSuccessHandler}
          inProgress={isTransactionInProgress}
        />
      )}
      {showTransactionComplete && (
        <TransactionCompleteModal
          onClose={() => setShowTransactionComplete(false)}
        />
      )}
    </Page>
  );
};

export default Swap;
