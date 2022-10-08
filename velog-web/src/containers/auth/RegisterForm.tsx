import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { registerFormState } from '@modules/auth';
import AuthForm from '@components/auth/AuthForm';
import useAsync from '@lib/hooks/useAsync';
import { check, register } from '@lib/api/auth';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useRecoilState(registerFormState);
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form) {
      const { username, password, passwordConfirm } = form;
      if (username === '' || password === '' || passwordConfirm === '') {
        console.log('모든 값을 입력해 주세요.');
        return;
      }
      if (password !== passwordConfirm) {
        console.log('비밀번호가 일치하지 않습니다.');
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
      console.log('에러 발생');
      console.log(authError);
    }
    if (authData) {
      console.log('회원가입 완료');
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
      type="register"
      form={form}
      error={authError}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default RegisterForm;
