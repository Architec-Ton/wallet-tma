import { useNavigate } from 'react-router-dom';
import Page from '../../components/containers/Page';
import useLanguage from '../../hooks/useLanguage';
import {
  iconPageAddWalletCircle,
  iconPageAddWalletImport,
  iconPageAddWalletKey,
  iconPageAddWalletNextPage,
} from '../../assets/icons/pages/add-wallet';
import Column from '../../components/containers/Column';
import TileButton from '../../components/buttons/TileButton';
import { useEffect } from 'react';
import { usePage } from '../../hooks/usePage';

function AddWallet() {
  const t = useLanguage('AddWallet');

  const navigate = useNavigate();

  const page = usePage();

  const addWalletButtons = [
    {
      name: 'create',
      icon: iconPageAddWalletCircle,
      page: '/registration/secret-key',
    },
    {
      name: 'existing',
      icon: iconPageAddWalletKey,
      page: '/registration/existing',
    },
    { name: 'import', icon: iconPageAddWalletImport, page: '/' },
  ];

  useEffect(() => {
    page.setTitle({ title: t('AddWallet') });
  }, []);

  return (
    <Page>
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
