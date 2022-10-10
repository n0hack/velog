import PostViewer from '@components/post/PostViewer';
import { readPost } from '@lib/api/posts';
import useAsync from '@lib/hooks/useAsync';
import React from 'react';
import { useParams } from 'react-router-dom';

const PostViewerContainer = () => {
  const params = useParams<{ username: string; postId: string }>();
  const {
    loading,
    data: post,
    error,
  } = useAsync(() => {
    return readPost(params.postId!);
  }, [params.postId]);

  return <PostViewer post={post} loading={loading} error={error} />;
};

export default PostViewerContainer;
