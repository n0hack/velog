import React from 'react';
import { Header } from '@components/common';
import { PostActionButton, PostViewer } from '@components/post';
import useAsync from '@hooks/useAsync';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { writeFormState } from '@modules/write';
import { authState } from '@modules/auth';

const PostPage = () => {
  const auth = useRecoilValue(authState);
  const [form, setForm] = useRecoilState(writeFormState);
  const navigate = useNavigate();
  const params = useParams<{ username: string; postId: string }>();
  const {
    loading,
    data: post,
    error,
  } = useAsync(() => api.posts.readPost(params.postId!), [params.postId]);

  const onEdit = () => {
    if (post) {
      const { title, body, tags } = post.data;
      setForm((form) => ({ title, body, tags, originalPost: post.data }));
      localStorage.setItem('post', JSON.stringify(post.data));
      navigate('/write');
    }
  };

  const ownPost = (auth && auth._id) === (post && post.data.user._id);

  if (!post) {
    return null;
  }

  return (
    <>
      <Header />
      <PostViewer
        loading={loading}
        post={post.data}
        error={error}
        actionButtons={ownPost && <PostActionButton onEdit={onEdit} />}
      />
    </>
  );
};

export default PostPage;
