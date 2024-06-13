import { useEffect } from 'react';
import {
  iconPageStartCoin,
  iconPageStartGameboy,
  iconPageStartShieldTick,
} from '../../assets/icons/pages/start';
import Column from '../../components/containers/Column';
import Page from '../../components/containers/Page';
import Tile from '../../components/typography/Tile';
import useLanguage from '../../hooks/useLanguage';
import useRouter from '../../hooks/useRouter';
import { useTmaMainButton } from '../../hooks/useTma';

function Welcome() {
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const t = useLanguage('Welcome');
  const welcomeIcons = [
    iconPageStartCoin,
    iconPageStartGameboy,
    iconPageStartShieldTick,
  ];

  useEffect(() => {
    btn.init(
      t('next', 'button'),
      () => {
        console.log('call btn');
        navigate('/registration/add-wallet');
      },
      true
    );
  }, []);

  return (
    <Page title={t('welcome-to')} titleAccent={'Architec.TON'}>
      <Column>
        {welcomeIcons.map((icon, index: number) => (
          <Tile
            key={index}
            icon={icon}
            title={t(`${index}-title`)}
            description={t(`${index}-description`)}
          />
        ))}
      </Column>
    </Page>
  );
}

export default Welcome;
