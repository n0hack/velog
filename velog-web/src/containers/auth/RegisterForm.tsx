import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState, registerFormState } from '@modules/auth';
import AuthForm from '@components/auth/AuthForm';
import useAsync from '@lib/hooks/useAsync';
import { check, register } from '@lib/api/auth';

const RegisterForm = () => {
  const [error, setError] = useState<string | null>('');
  const [form, setForm] = useRecoilState(registerFormState);
  const [auth, setAuth] = useRecoilState(authState);
  const resetForm = useResetRecoilState(registerFormState);
  const {
    data: authData,
    error: authError,
    requestApi,
  } = useAsync(
    () => register({ username: form?.username!, password: form?.password! }),
    [],
    true,
  );
  const { data: user } = useAsync(check, [authData]);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form) {
      const { username, password, passwordConfirm } = form;
      if ([username, password, passwordConfirm].includes('')) {
        setError('모든 값을 입력해 주세요.');
        return;
      }
      if (password !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
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
      console.log(authData);
      try {
        localStorage.setItem('user', JSON.stringify(authData));
        setAuth(authData);
      } catch (e) {
        console.log('로컬스토리지 저장 실패');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData, authError]);

  useEffect(() => {
    if (user || auth) {
      navigate('/');
    }
  }, [user, auth, navigate]);

  return (
    <AuthForm
      type="register"
      form={form}
      error={error}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default RegisterForm;
