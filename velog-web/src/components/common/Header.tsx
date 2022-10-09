import React from 'react';
import styled from '@emotion/styled';
import Responsive from './Responsive';
import Button from './Button';

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Wrapper>
          <div className="logo">VELOG</div>
          <div className="right">
            <Button>로그인</Button>
          </div>
        </Wrapper>
      </StyledHeader>
      <Spacer />
    </>
  );
};

export default Header;

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;
