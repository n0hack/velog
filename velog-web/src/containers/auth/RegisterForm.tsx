import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { registerFormState } from '@modules/auth';
import AuthForm from '@components/auth/AuthForm';

const RegisterForm = () => {
  const [form, setForm] = useRecoilState(registerFormState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setForm({ username: '', password: '', passwordConfirm: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthForm
      type="register"
      form={form}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default RegisterForm;
