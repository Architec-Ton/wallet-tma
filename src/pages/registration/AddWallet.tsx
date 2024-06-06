import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
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
// import LinkToSupport from "../../link-to-support/linkToSupport.tsx";

function AddWallet() {
  const t = useLanguage('AddWallet');
  //   const { tg } = useTelegram();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     tg.MainButton.hide();
  //   }, [tg]);

  //   const goNext = (nav: string) => {
  //     navigate(nav);
  //   };
  const addWalletButtons = [
    { name: 'create', icon: iconPageAddWalletCircle, page: '/aaaa' },
    { name: 'existing', icon: iconPageAddWalletKey, page: '/aaaa' },
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
          />
        ))}
      </Column>
    </Page>

    // <div>
    //   <h1>Add a Wallet</h1>
    //   {WalletButtons.map((buttonProps: WalletButtonProps, index: number) => (
    //     <div key={index} onClick={() => goNext(buttonProps.path)}>
    //       <img src={buttonProps.icon} alt={buttonProps.title} />
    //       <h2>{buttonProps.title}</h2>
    //       <p>{buttonProps.message}</p>
    //       <img src={NEXT_PAGE} alt={'go'} />
    //     </div>
    //   ))}
    //   <LinkToSupport />
    //   <BackButton />
    // </div>
  );
}

export default AddWallet;
