import React from 'react';
import { css } from '@emotion/react';

interface Props {
  children?: React.ReactNode;
}

const Responsive = ({ children, ...rest }: Props) => {
  return (
    <div
      css={css`
        width: 1024px;
        margin: 0 auto;
        padding: 0 1rem;

        @media (max-width: 1024px) {
          width: 768px;
        }

        @media (max-width: 768px) {
          width: 100%;
        }
      `}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Responsive;
