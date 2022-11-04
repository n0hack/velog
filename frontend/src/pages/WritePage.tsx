import React, { useEffect, useCallback } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { writeFormState } from '@modules/write';
import { Responsive } from '@components/common';
import { Editor, TagBox, WriteActionButton } from '@components/write';
import { useNavigate } from 'react-router-dom';
import useAsync from '@hooks/useAsync';
import api from '@api';

const WritePage = () => {
  const [form, setForm] = useRecoilState(writeFormState);
  const resetForm = useResetRecoilState(writeFormState);
  const navigate = useNavigate();
  const {
    data: post,
    error,
    requestApi: writePost,
  } = useAsync(() => api.posts.writePost({ ...form }), [], true);

  const onChangeField = useCallback(
    (payload: { key: 'title' | 'body' | 'tags'; value: string | string[] }) => {
      setForm((form) => ({ ...form, [payload.key]: payload.value }));
    },
    [setForm],
  );

  const onCancel = () => {
    navigate(-1);
  };

  const onPublish = () => {
    writePost();
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      navigate(`/@${user.username}/${_id}`);
    }

    if (error) {
      console.log(error);
    }
  }, [error, navigate, post]);

  return (
    <Responsive>
      <Editor
        title={form.title}
        body={form.body}
        onChangeField={onChangeField}
      />
      <TagBox tags={form.tags} onChangeField={onChangeField} />
      <WriteActionButton onCancel={onCancel} onPublish={onPublish} />
    </Responsive>
  );
};

export default WritePage;
