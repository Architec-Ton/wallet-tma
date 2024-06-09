import { useMainButton, useViewport } from '@tma.js/sdk-react';
import { EventHandler, TmaMainButton, useTmaState } from '../../hooks/useTma';

type Props = {
  title?: string;
  onClick?: EventHandler;
  visible: boolean;
};

type PropsBtn = {
  mainButton: TmaMainButton;
};

function MainButtonTMA({ title, onClick, visible }: Props) {
  const mb = useMainButton();
  const tma = useViewport();
  if (visible && title) {
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

function MainButton({ mainButton }: PropsBtn) {
  const { isTmaLoading, isTma } = useTmaState();
  if (isTmaLoading) return <></>;
  if (isTma)
    return (
      <MainButtonTMA
        title={mainButton.title}
        onClick={mainButton.onClick}
        visible={mainButton.visible}
      />
    );
  return (
    <>
      {mainButton.visible && (
        <div className="mainbutton-container">
          {!isTma && (
            <button onClick={mainButton.onClick} className="primary-btn">
              {mainButton.title}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default MainButton;
