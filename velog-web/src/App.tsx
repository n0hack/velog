import React, { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@modules/auth';
import Routes from '@pages/Routes';

function App() {
  const setAuth = useSetRecoilState(authState);

  useLayoutEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        setAuth(JSON.parse(user));
      }
    } catch (e) {
      console.log('로컬스토리지 불러오기 실패');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Routes />;
}

export default App;
