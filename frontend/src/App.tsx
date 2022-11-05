import React, { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@modules/auth';
import Routes from '@pages/Routes';
import { Helmet } from 'react-helmet-async';

function App() {
  const setAuth = useSetRecoilState(authState);

  useLayoutEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;
      setAuth(JSON.parse(user));
    } catch (e) {
      console.log('localStorage is not working');
    }
  }, [setAuth]);

  return (
    <>
      <Helmet>
        <title>Velog</title>
      </Helmet>
      <Routes />
    </>
  );
}

export default App;
