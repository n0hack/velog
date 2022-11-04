import { atom, DefaultValue, selector } from 'recoil';

interface Write {
  title: string;
  body: string;
  tags: string[];
}

const formState = atom<Write>({
  key: 'formState',
  default: {
    title: '',
    body: '',
    tags: [],
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
      });
    } else {
      set(formState, newValue);
    }
  },
});
