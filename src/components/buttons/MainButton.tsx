import { useMainButton, useViewport } from '@tma.js/sdk-react';
import { EventHandler } from '../../hooks/useTma';
import { useAppSelector } from '../../hooks/useAppDispatch';
import {
  selectIsTma,
  selectIsTmaLoading,
} from '../../features/tma/tmaSelector';
import { useEffect } from 'react';

type Props = {
  title?: string;
  onClick?: EventHandler;
  visible: boolean;
};

function MainButtonTMA({ title, onClick, visible }: Props) {
  const mb = useMainButton();
  const tma = useViewport();

  useEffect(() => {
    if (visible && title) {
      mb.setText(title);
      mb.setBgColor('#07ACFF');
      mb.setTextColor('#FFFFFF');
      mb.hideLoader();
      console.log('onCLick', onClick);
      if (onClick !== undefined) {
        mb.on('click', () => {
          //mb.showLoader();
          onClick();
        });
        mb.enable();
        mb.show();
        //tma?.expand();
      }
    } else {
      mb.hide();
    }
  }, [title, visible, onClick, mb]);

  useEffect(() => {
    tma?.expand();
  }, [tma]);
  return <></>;
}

function MainButton({ title, onClick, visible }: Props) {
  const isTma = useAppSelector(selectIsTma);
  const isTmaLoading = useAppSelector(selectIsTmaLoading);

  if (isTmaLoading) return <></>;
  if (isTma)
    return <MainButtonTMA title={title} onClick={onClick} visible={visible} />;
  return (
    <>
      {
        <div className="mainbutton-container">
          {visible && (
            <button onClick={onClick} className="primary-btn">
              {title}
            </button>
          )}
        </div>
      }
    </>
  );
}

export default MainButton;
