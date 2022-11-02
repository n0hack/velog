import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import palette from '@styles/palette';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const Button = (props: Props) => {
  return <StyledButton {...props} />;
};

export default Button;

const StyledButton = styled.button`
  padding: 0.25rem 1rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  background: ${palette.gray[8]};
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${palette.gray[6]};
  }
`;
