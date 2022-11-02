import React from 'react';
import styled from '@emotion/styled';
import palette from '@styles/palette';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';

interface Props {
  type: 'login' | 'register';
}

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type }: Props) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
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
    </AuthFormBlock>
  );
};

export default AuthForm;

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    margin-bottom: 1rem;
    color: ${palette.gray[8]};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  outline: none;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};

  &:focus {
    color: ${palette.cyan[7]};
    border-bottom: 1px solid ${palette.gray[7]};
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
