import { useNavigate } from 'react-router-dom';
import Section from '../../components/containers/Section';
import ListBlock from '../../components/ui/listBlock';
import useLanguage from '../../hooks/useLanguage';
import Page from '../../components/containers/Page';
import { useEffect, useState } from 'react';
import { usePage } from '../../hooks/usePage';
import { useApiWalletAssetsMutation } from '../../features/wallet/walletApi';
import ListTileItem from '../../components/ui/listBlock/ListTileItem';
import { CoinDto } from '../../types/assest';

export type AssetType = {
  thumb: string;
  title: string;
  description: string;
  wallet: string;
  coin: string;
};

const SelectAsset = () => {
  const t = useLanguage('send-select');
  const navigate = useNavigate();
  const [walletApiAssets] = useApiWalletAssetsMutation();
  const page = usePage();
  const [assets, setAssets] = useState<CoinDto[]>([]);

  const handlerClick = (asset: CoinDto) => {
    navigate('/send/address', {
      state: asset,
    });
  };

  const handleInfo = async () => {
    try {
      const result = await walletApiAssets(null).unwrap();
      console.log('Wallet result:', result);
      setAssets(result);
    } catch (err) {
      console.error('Failed to get info: ', err);
    } finally {
      page.setLoading(false, false);
    }
  };

  useEffect(() => {
    page.setTitle(t('choose-asset'));
    handleInfo();
  }, []);

  return (
    <Page>
      <Section title={t('title')} className="add-crypto__container">
        <ListBlock>
          {assets.map((asset, index) => {
            return (
              <ListTileItem
                key={`${asset.meta?.address}-${index}`}
                icon={asset.meta?.image}
                title={asset.meta?.name}
                description={`${asset.amount.toLocaleString(undefined, {
                  maximumFractionDigits: 5, //asset.meta?.decimals,
                  minimumFractionDigits: 2,
                })} ${asset.meta?.symbol}`}
                onClick={() => handlerClick(asset)}></ListTileItem>
            );
          })}
        </ListBlock>
      </Section>
    </Page>
  );
};

export default SelectAsset;
