import React from 'react';
import styled from '@emotion/styled';
import palette from '@lib/styles/palette';
import { Link } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

const AuthTemplate = ({ children }: Props) => {
  return (
    <StyledAuthTemplate>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">Velog</Link>
        </div>
        {children}
      </WhiteBox>
    </StyledAuthTemplate>
  );
};

export default AuthTemplate;

const StyledAuthTemplate = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${palette.gray[2]};
`;

const WhiteBox = styled.div`
  width: 22.5rem;
  padding: 2rem;
  background: white;
  border-radius: 0.125rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.025);

  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
`;
