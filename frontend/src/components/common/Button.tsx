import React, { HTMLAttributes } from 'react';
import palette from '@styles/palette';
import { css } from '@emotion/react';

interface Props {
  fullWidth?: boolean;
  cyan?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  fullWidth = false,
  cyan = false,
  style,
  children,
  onClick,
  ...rest
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      css={css`
        width: ${fullWidth ? '100%' : 'auto'};
        padding: ${fullWidth ? '0.75rem 0' : '0.25rem 1rem'};
        color: white;
        font-size: ${fullWidth ? '1.125rem' : '1rem'};
        font-weight: bold;
        background: ${cyan ? palette.cyan[5] : palette.gray[8]};
        border: 0;
        border-radius: 0.25rem;
        outline: 0;
        cursor: pointer;
        &:hover {
          background: ${cyan ? palette.cyan[4] : palette.gray[6]};
        }
      `}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
