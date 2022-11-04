import { atom } from 'recoil';
import { AxiosError } from 'axios';
import { Post } from '@api/posts';

interface Posts {
  posts: Post[] | null;
  error: AxiosError | null;
  lastPage: number;
}

export const postsState = atom<Posts>({
  key: 'postsState',
  default: {
    posts: null,
    error: null,
    lastPage: 1,
  },
});
