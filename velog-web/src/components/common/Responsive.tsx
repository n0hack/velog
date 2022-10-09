import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children?: React.ReactNode;
}

const Responsive = ({ children, ...rest }: Props) => {
  return <StyledResponsive {...rest}>{children}</StyledResponsive>;
};

export default Responsive;

const StyledResponsive = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
