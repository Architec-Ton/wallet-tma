import { useEffect } from 'react';
import { iconButtonCopy } from '../../assets/icons/buttons/index.ts';
import Button from '../../components/buttons/Button.tsx';
import Column from '../../components/containers/Column.tsx';
import Page from '../../components/containers/Page.tsx';
import Block from '../../components/typography/Block.tsx';
import useLanguage from '../../hooks/useLanguage.ts';
import { useTmaMainButton } from '../../hooks/useTma.ts';
import './SecretKey.styles.css';
import { usePage } from '../../hooks/usePage.ts';
import useRouter from '../../hooks/useRouter.ts';

const key_to_wallet = [
  'test1',
  'test2',
  'test3',
  'test4',
  'test5',
  'test6',
  'test7',
  'test8',
  'test9',
  'test10',
  'test11',
  'test12',
  'test13',
  'test14',
  'test15',
  'test16',
  'test17',
  'test18',
  'test19',
  'test20',
  'test21',
  'test22',
  'test23',
  'test24',
];

const SecretKey = () => {
  const t = useLanguage('Key');
  const navigate = useRouter();
  const btn = useTmaMainButton();
  const page = usePage();

  useEffect(() => {
    page.setLoading(false)
    btn.init(
      t('next', 'button'),
      () => navigate('/registration/confirm-secret-key'),
      true
    );
  }, []);

  const copyToClipboard = () => {
    const textToCopy = key_to_wallet.join(' ');
    navigator.clipboard
      .writeText(textToCopy)
      //toDO алерт для тг .then(() => alert('Words copied to clipboard'))
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  return (
    <Page title={t('your-secret-key')} hintMessage={'here hint message'}>
      <Column>
        <Block
          style={{
            display: 'block',
          }}>
          <Column columns={2} className="center">
            {key_to_wallet.map((word, index) => (
              <div className="registration-mnemonic-word" key={index}>
                <h2>
                  {index + 1}. {word}
                </h2>
              </div>
            ))}
          </Column>
        </Block>
        <div className="center p-1">
          <Button
            icon={iconButtonCopy}
            title={t('Copy', 'button')}
            primary={false}
            onClick={copyToClipboard}
          />
        </div>
      </Column>
    </Page>
  );
};

export default SecretKey;
