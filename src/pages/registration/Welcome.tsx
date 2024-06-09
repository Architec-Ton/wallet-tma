import Page from '../../components/containers/Page';
import Tile from '../../components/typography/Tile';
import {
  iconPageStartCoin,
  iconPageStartGameboy,
  iconPageStartShieldTick,
} from '../../assets/icons/pages/start';
import Column from '../../components/containers/Column';
import useLanguage from '../../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { useTmaMainButton } from '../../hooks/useTma';
import { useEffect } from 'react';
import { usePage } from '../../hooks/usePage';

function Welcome() {
  const navigate = useNavigate();
  const btn = useTmaMainButton();
  const page = usePage();
  const t = useLanguage('Welcome');

  const welcomeIcons = [
    iconPageStartCoin,
    iconPageStartGameboy,
    iconPageStartShieldTick,
  ];

  useEffect(() => {
    btn.init(t('next'), () => navigate('/add-wallet'), true);
    page.setTitle({ title: t('welcome-to'), titleAccent: 'Architec.TON' });
  }, []);

  return (
    <Page>
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
