import React from 'react';
import styled from '@emotion/styled';
import palette from '@styles/palette';
import { Link } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

const AuthTemplate = ({ children }: Props) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">VELOG</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: grid;
  place-items: center;
  background: ${palette.gray[2]};
`;

const WhiteBox = styled.div`
  width: 360px;
  padding: 2rem;
  background: white;
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);

  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
`;
