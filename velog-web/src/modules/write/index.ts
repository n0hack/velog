import { atom, DefaultValue, selector } from 'recoil';

interface WriteForm {
  title: string;
  body: string;
  tags: string[];
}

const initialForm = atom<WriteForm>({
  key: 'InitialForm',
  default: {
    title: '',
    body: '',
    tags: [],
  },
});

export const writeFormState = selector<WriteForm>({
  key: 'WriteFormState',
  get: ({ get }) => {
    const form = get(initialForm);
    return form;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(initialForm, {
        title: '',
        body: '',
        tags: [],
      });
    } else {
      set(initialForm, newValue);
    }
  },
});
