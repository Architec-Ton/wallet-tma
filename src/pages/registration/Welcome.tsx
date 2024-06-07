import Page from '../../components/containers/Page';
import Title from '../../components/typography/Title';
import Tile from '../../components/typography/Tile';
import {
  iconPageStartCoin,
  iconPageStartGameboy,
  iconPageStartShieldTick,
} from '../../assets/icons/pages/start';
import Column from '../../components/containers/Column';
import useLanguage from '../../hooks/useLanguage';

function Welcome() {
  const t = useLanguage('Welcome');

  const welcomeIcons = [
    iconPageStartCoin,
    iconPageStartGameboy,
    iconPageStartShieldTick,
  ];

  return (
    <Page title={<Title title={t('welcome-to')} titleAccent="Architec.TON" />}>
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
      {/* <LinkToSupport />
      <MainButton text={'Further'} onClick={clickFurther} /> */}
    </Page>
  );
}

export default Welcome;
