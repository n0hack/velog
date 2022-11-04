import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { AuthForm, AuthTemplate } from '@components/auth';
import { authState, registerFormState } from '@modules/auth';
import useAsync from '@hooks/useAsync';
import api from '@api';

const RegisterPage = () => {
  const [error, setError] = useState<string>('');
  const [form, setForm] = useRecoilState(registerFormState);
  const [auth, setAuth] = useRecoilState(authState);
  const resetForm = useResetRecoilState(registerFormState);
  const {
    data: authData,
    error: authError,
    requestApi: register,
  } = useAsync(
    () =>
      api.auth.register({
        username: form?.username!,
        password: form?.password!,
      }),
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
      const { username, password, passwordConfirm } = form;

      if ([username, password, passwordConfirm].includes('')) {
        setError('모든 값을 입력해 주세요.');
        return;
      }

      if (password !== passwordConfirm) {
        return;
      }

      register();
    }
  };

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authError) {
      if (authError.response?.status === 409) {
        setError('이미 존재하는 아이디입니다.');
        return;
      }
      setError('회원가입 실패');
      console.log(authError);
      return;
    }

    if (authData) {
      console.log('회원가입 완료');
      console.log('authData');

      try {
        localStorage.setItem('user', JSON.stringify(authData.data));
        setAuth(authData.data);
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
        type="register"
        form={form}
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </AuthTemplate>
  );
};

export default RegisterPage;
