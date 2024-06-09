import { useNavigate } from 'react-router-dom';
import Page from '../../components/containers/Page';
import useLanguage from '../../hooks/useLanguage';
import Title from '../../components/typography/Title';
import {
  iconPageAddWalletCircle,
  iconPageAddWalletImport,
  iconPageAddWalletKey,
  iconPageAddWalletNextPage,
} from '../../assets/icons/pages/add-wallet';
import Column from '../../components/containers/Column';
import TileButton from '../../components/buttons/TileButton';


function AddWallet() {
  const t = useLanguage('AddWallet');

  const navigate = useNavigate();

  const addWalletButtons = [
    { name: 'create', icon: iconPageAddWalletCircle, page: '/secret-key' },
    { name: 'existing', icon: iconPageAddWalletKey, page: '/existing' },
    { name: 'import', icon: iconPageAddWalletImport, page: '/aaaa' },
  ];

  return (
    <Page title={<Title title={t('AddWallet')} />}>
      <Column>
        {addWalletButtons.map((btn) => (
          <TileButton
            icon={btn.icon}
            key={btn.name}
            title={t(`${btn.name}-title`)}
            description={t(`${btn.name}-description`)}
            iconAction={iconPageAddWalletNextPage}
            onClick={() => navigate(btn.page)}
          />
        ))}
      </Column>
    </Page>
  );
}

export default AddWallet;
