import client from './client';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  username: string;
}

const auth = {
  login: ({ username, password }: AuthRequest) => {
    return client.post<AuthResponse>('/api/auth/login', { username, password });
  },
  logout: () => {
    return client.post('/api/auth/logout');
  },
  register: ({ username, password }: AuthRequest) => {
    return client.post<AuthResponse>('/api/auth/register', {
      username,
      password,
    });
  },
  check: () => {
    return client.get<AuthResponse>('/api/auth/check');
  },
};

export default auth;
