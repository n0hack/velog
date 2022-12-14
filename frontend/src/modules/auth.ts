import { atom, DefaultValue, selector } from 'recoil';

export interface Auth {
  _id: string;
  username: string;
}

interface AuthForm {
  register?: RegisterForm;
  login?: LoginForm;
}

export interface RegisterForm {
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface LoginForm {
  username?: string;
  password?: string;
}

const authFormState = atom<AuthForm>({
  key: 'authFormState',
  default: {
    register: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    login: {
      username: '',
      password: '',
    },
  },
});

export const loginFormState = selector({
  key: 'loginFormState',
  get: ({ get }) => {
    const loginForm = get(authFormState).login;
    return loginForm;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(authFormState, {
        ...authFormState,
        login: { username: '', password: '' },
      });
    } else {
      set(authFormState, { ...authFormState, login: newValue });
    }
  },
});

export const registerFormState = selector({
  key: 'registerFormState',
  get: ({ get }) => {
    const registerForm = get(authFormState).register;
    return registerForm;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(authFormState, {
        ...authFormState,
        register: { username: '', password: '', passwordConfirm: '' },
      });
      // set(authFormState, {})
    } else {
      set(authFormState, { ...authFormState, register: newValue });
    }
  },
});

export const authState = atom<Auth | null>({
  key: 'authState',
  default: null,
});
