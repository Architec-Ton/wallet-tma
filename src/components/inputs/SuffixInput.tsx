import {
  FC,
  InputHTMLAttributes,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import './SuffixInput.styles.css';
import classNames from 'classnames';

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'style'
> & {
  suffix?: ReactNode;
};

const inputPadding = 0 as const;
const suffixGap = 10 as const;

export const SuffixInput: FC<InputProps> = ({
  value,
  placeholder,
  suffix,
  className,
  ...props
}) => {
  const suffixRef = useRef<HTMLSpanElement>(null);

  const [inputRightPadding, setInputRightPadding] = useState<number>(0);

  useLayoutEffect(() => {
    const suffixWidth = suffixRef.current?.offsetWidth;
    setInputRightPadding(
      suffix && suffixWidth
        ? suffixWidth + (inputPadding + suffixGap)
        : inputPadding
    );
  }, [suffix]);

  return (
    <div className={'inputWrapper'}>
      <input
        className={classNames('inputSuffix', className)}
        style={{
          padding: inputPadding,
          paddingRight: inputRightPadding,
        }}
        value={value}
        placeholder={placeholder}
        {...props}
      />
      <div
        className={'inputFakeValueWrapper'}
        style={{ gap: suffixGap, padding: inputPadding }}>
        <span className={'inputFakeValue'}>{value || placeholder}</span>
        <span ref={suffixRef} className={'suffix'}>
          {suffix}
        </span>
      </div>
    </div>
  );
};
