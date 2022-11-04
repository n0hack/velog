import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import palette from '@styles/palette';

interface Props {
  to?: string;
  fullWidth?: boolean;
  cyan?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  to,
  fullWidth = false,
  cyan = false,
  style,
  children,
  onClick,
  ...rest
}: Props) => {
  const _style = css`
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
  `;

  const handleClick = () => {
    onClick?.();
  };

  if (to) {
    return (
      <Link to={to} css={_style}>
        {children}
      </Link>
    );
  }

  return (
    <button css={_style} style={style} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
