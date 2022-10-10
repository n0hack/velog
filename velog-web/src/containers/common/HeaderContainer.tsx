import Header from '@components/common/Header';
import { logout } from '@lib/api/auth';
import useAsync from '@lib/hooks/useAsync';
import { authState } from '@modules/auth';
import React from 'react';
import { useRecoilState } from 'recoil';

const HeaderContainer = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const { requestApi } = useAsync(logout, [], true);

  const onLogout = () => {
    try {
      localStorage.removeItem('user');
    } catch (e) {
      console.log('로컬스토리지 삭제 실패');
    }
    setAuth(null);
    requestApi();
  };

  return <Header user={auth} onLogout={onLogout} />;
};

export default HeaderContainer;
