import { useState } from 'react';
import INFO_ICON from '../../assets/icons/pages/secret-key/info-circle.svg';
import './Title.styles.css'

interface Props {
  title?: string;
  titleAccent?: string;
  hintMessage?: string;
}

function Title({ title, titleAccent, hintMessage }: Props) {
  const [showHint, setShowHint] = useState(false);

  const handleIconClick = () => {
    setShowHint(true);
    setTimeout(() => {
      setShowHint(false);
    }, 3000);
  };

  return (
    <h1 className="title">
      {title}
      {titleAccent && <span> {titleAccent}</span>}
      {hintMessage && (
        <div style={{
          display: 'inline-block',
          position: 'relative',
        }}>
          <img
            src={INFO_ICON}
            alt="icon"
            className="icon"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              marginLeft: 'var(--spacing-8)',
              cursor: 'pointer',
            }}
            onClick={handleIconClick}
          />
          {showHint && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                backgroundColor: 'var(--hint-message-back-background-color)',
                color: 'white',
                padding: 'var(--spacing-4) var(--spacing-8)',
                borderRadius: 'var(--border-radius-8)',
                marginTop: 'var(--spacing-4)',
                fontSize: 'var(--font-size-small)',
                maxWidth: '200px',
                whiteSpace: 'normal',
                zIndex: '1000'
              }}>
              {hintMessage}
            </div>
          )}
        </div>
      )}
    </h1>
  );
}

export default Title;
