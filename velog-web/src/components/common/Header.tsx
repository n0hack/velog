import React from 'react';
import styled from '@emotion/styled';
import Responsive from './Responsive';
import Button from './Button';
import { Auth } from '@modules/auth';
import { Link } from 'react-router-dom';

interface Props {
  user?: Auth | null;
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: Props) => {
  return (
    <>
      <StyledHeader>
        <Wrapper>
          <Link to="/" className="logo">
            VELOG
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
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

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Spacer = styled.div`
  height: 4rem;
`;
