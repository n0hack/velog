import { Post } from '@api/posts';
import { atom, DefaultValue, selector } from 'recoil';

interface Write {
  title: string;
  body: string;
  tags: string[];
  originalPost: Post | null;
}

const formState = atom<Write>({
  key: 'formState',
  default: {
    title: '',
    body: '',
    tags: [],
    originalPost: null,
  },
});

export const writeFormState = selector({
  key: 'writeFormState',
  get: ({ get }) => {
    return get(formState);
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(formState, {
        title: '',
        body: '',
        tags: [],
        originalPost: null,
      });
    } else {
      set(formState, newValue);
    }
  },
});
