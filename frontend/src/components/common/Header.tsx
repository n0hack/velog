import React from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '@modules/auth';
import useAsync from '@hooks/useAsync';
import api from '@api';

const Header = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { requestApi: logout } = useAsync(api.auth.logout, [], true);

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      setAuth(null);
    } catch (e) {
      console.log('localStorage is not working');
    }
    logout();
  };

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            VELOG
          </Link>
          {auth ? (
            <div className="right">
              <UserInfo>{auth.username}</UserInfo>
              <Button onClick={handleLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;

const HeaderBlock = styled.div`
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

const UserInfo = styled.div`
  margin-right: 1rem;
  font-weight: 800;
`;
