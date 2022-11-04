import React from 'react';
import { Header } from '@components/common';
import { PostViewer } from '@components/post';
import useAsync from '@hooks/useAsync';
import { useParams } from 'react-router-dom';
import api from '@api';

const PostPage = () => {
  const params = useParams<{ username: string; postId: string }>();
  const {
    loading,
    data: post,
    error,
  } = useAsync(() => api.posts.readPost(params.postId!), [params.postId]);

  if (!post) {
    return null;
  }

  return (
    <>
      <Header />
      <PostViewer loading={loading} post={post.data} error={error} />
    </>
  );
};

export default PostPage;
