import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { writeFormState } from '@modules/write';
import Editor from '@components/write/Editor';

const EditorContainer = () => {
  const [{ title, body }, setForm] = useRecoilState(writeFormState);
  const resetForm = useResetRecoilState(writeFormState);

  const onChange = useCallback(
    (payload: { key: 'title' | 'body'; value: string }) => {
      setForm((form) => ({ ...form, [payload.key]: payload.value }));
    },
    [setForm],
  );

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return <Editor title={title} body={body} onChange={onChange} />;
};

export default EditorContainer;
