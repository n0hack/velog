import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginFormState } from '@modules/auth';
import AuthForm from '@components/auth/AuthForm';

const LoginForm = () => {
  const [form, setForm] = useRecoilState(loginFormState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setForm({ username: '', password: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthForm
      type="login"
      form={form}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default LoginForm;
