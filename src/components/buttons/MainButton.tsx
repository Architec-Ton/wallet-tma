import { useEffect, useState } from 'react';
import {
  isTMA,
  useInitData,
  useMainButton,
  useMiniApp,
  useViewport,
} from '@tma.js/sdk-react';

type Props = {
  title?: string;
  onClick?: () => void;
};

function MainButtonTMA({ title, onClick }: Props) {
  const mb = useMainButton();
  const tma = useViewport();
  if (title) {
    mb.setText(title);
    mb.setBgColor('#07ACFF');
    mb.setTextColor('#FFFFFF');
    mb.hideLoader();
    console.log('onCLick', onClick);
    if (onClick !== undefined) {
      mb.on('click', () => {
        mb.showLoader();
        onClick();
      });
      mb.enable();
      mb.show();
      tma?.expand();
    }
  } else {
    mb.hide();
  }
  return <></>;
}

function MainButton({ title, onClick }: Props) {
  const [isTma, setIsTma] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    isTMA()
      .then((tma) => setIsTma(tma))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <></>;
  if (isTma) return <MainButtonTMA title={title} onClick={onClick} />;

  return (
    <>
      {onClick && (
        <div className="mainbutton-container">
          {!isTma && (
            <button onClick={onClick} className="primary-btn">
              {title}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default MainButton;
