import React from 'react';
import { Header } from '@components/common';
import { PostActionButton, PostViewer } from '@components/post';
import useAsync from '@hooks/useAsync';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@api';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { writeFormState } from '@modules/write';
import { authState } from '@modules/auth';

const PostPage = () => {
  const auth = useRecoilValue(authState);
  const setForm = useSetRecoilState(writeFormState);
  const navigate = useNavigate();
  const params = useParams<{ username: string; postId: string }>();
  const {
    loading,
    data: post,
    error,
  } = useAsync(() => api.posts.readPost(params.postId!), [params.postId]);
  const { requestApi: removePost } = useAsync(
    () => api.posts.removePost(params.postId!),
    [],
    true,
  );

  const onEdit = () => {
    if (post) {
      const { title, body, tags } = post.data;
      setForm((form) => ({ title, body, tags, originalPost: post.data }));
      localStorage.setItem('post', JSON.stringify(post.data));
      navigate('/write');
    }
  };

  const onRemove = async () => {
    await removePost();
    navigate('/');
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
        actionButtons={
          ownPost && <PostActionButton onEdit={onEdit} onRemove={onRemove} />
        }
      />
    </>
  );
};

export default PostPage;
