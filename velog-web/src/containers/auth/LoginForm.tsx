import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginFormState } from '@modules/auth';
import AuthForm from '@components/auth/AuthForm';
import useAsync from '@lib/hooks/useAsync';
import { check, login } from '@lib/api/auth';

const LoginForm = () => {
  const [error, setError] = useState<string | null>('');
  const [form, setForm] = useRecoilState(loginFormState);
  const resetForm = useResetRecoilState(loginFormState);
  const {
    data: authData,
    error: authError,
    requestApi,
  } = useAsync(
    () => login({ username: form?.username!, password: form?.password! }),
    [],
    true,
  );
  const { data: user } = useAsync(check, [authData]);
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
      requestApi();
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
      return;
    }
    if (authData) {
      console.log('로그인 완료');
      console.log(authData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData, authError]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      error={error}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default LoginForm;
