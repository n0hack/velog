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
  const {
    data: updatedPost,
    error: updatedError,
    requestApi: updatePost,
  } = useAsync(
    () =>
      api.posts.updatePost({
        _id: form.originalPost?._id as string,
        ...form,
      }),
    [],
    true,
  );

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
    if (form.originalPost) {
      updatePost();
    } else {
      writePost();
    }
  };

  useEffect(() => {
    const editedPost = localStorage.getItem('post');
    if (editedPost) {
      const post = JSON.parse(editedPost);
      setForm({
        title: post.title,
        body: post.body,
        tags: post.tags,
        originalPost: post,
      });
    }

    return () => {
      resetForm();
      localStorage.removeItem('post');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (post) {
      const { _id, user } = post.data;
      setForm((form) => ({ ...form, originalPost: post.data }));
      navigate(`/@${user.username}/${_id}`);
    }

    if (updatedPost) {
      const { _id, user } = updatedPost.data;
      setForm((form) => ({ ...form, originalPost: updatedPost.data }));
      navigate(`/@${user.username}/${_id}`);
    }

    if (error || updatedError) {
      console.log(error ?? updatedError);
    }
  }, [error, navigate, post, setForm, updatedError, updatedPost]);

  return (
    <Responsive>
      <Editor
        title={form.title}
        body={form.body}
        onChangeField={onChangeField}
      />
      <TagBox tags={form.tags} onChangeField={onChangeField} />
      <WriteActionButton
        onCancel={onCancel}
        onPublish={onPublish}
        isEdit={!!form.originalPost}
      />
    </Responsive>
  );
};

export default WritePage;
