import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import palette from '@lib/styles/palette';
import Button from '@components/common/Button';
import { LoginForm, RegisterForm } from '@modules/auth';

interface Props {
  type: 'login' | 'register';
  form: RegisterForm | LoginForm | undefined;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, form, onSubmit, onChange }: Props) => {
  const text = textMap[type];

  if (!form) return null;

  return (
    <StyledAuthForm>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          name="username"
          placeholder="아이디"
          autoComplete="off"
          value={form.username}
          onChange={onChange}
        />
        <StyledInput
          name="password"
          placeholder="비밀번호"
          type="password"
          autoComplete="off"
          value={form.password}
          onChange={onChange}
        />
        {type === 'register' && (
          <StyledInput
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            autoComplete="off"
            value={(form as RegisterForm).passwordConfirm}
            onChange={onChange}
          />
        )}
        <Button cyan fullWidth style={{ marginTop: '1rem' }}>
          {text}
        </Button>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </StyledAuthForm>
  );
};

export default AuthForm;

const StyledAuthForm = styled.div`
  h3 {
    margin: 0;
    margin-bottom: 1rem;
    color: ${palette.gray[8]};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding-bottom: 0.5rem;
  border: 0;
  border-bottom: 1px solid ${palette.gray[5]};
  outline: 0;

  &:focus {
    border-bottom: 1px solid ${palette.gray[5]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;

  a {
    color: ${palette.gray[6]};
    text-decoration: underline;

    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;
