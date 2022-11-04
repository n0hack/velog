import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { AuthForm, AuthTemplate } from '@components/auth';
import { authState, loginFormState } from '@modules/auth';
import useAsync from '@hooks/useAsync';
import api from '@api';

const LoginPage = () => {
  const [error, setError] = useState<string>('');
  const [form, setForm] = useRecoilState(loginFormState);
  const [auth, setAuth] = useRecoilState(authState);
  const resetForm = useResetRecoilState(loginFormState);
  const {
    data: authData,
    error: authError,
    requestApi: login,
  } = useAsync(
    () =>
      api.auth.login({ username: form?.username!, password: form?.password! }),
    [],
    true,
  );
  const { data: user } = useAsync(api.auth.check, [authData]);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form) {
      const { username, password } = form;
      if ([username, password].includes('')) {
        setError('모든 값을 입력해 주세요.');
        return;
      }
      login();
    }
  };

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authError) {
      setError('로그인 실패');
      console.log(authError);
    }
    if (authData) {
      console.log('로그인 완료');
      console.log(authData);

      try {
        localStorage.setItem('user', JSON.stringify(authData));
        setAuth(authData);
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData, authError]);

  useEffect(() => {
    if (user || auth) {
      navigate('/');
    }
  }, [auth, navigate, user]);

  return (
    <AuthTemplate>
      <AuthForm
        type="login"
        form={form}
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </AuthTemplate>
  );
};

export default LoginPage;
