import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@components/common';
import { Pagination, PostList } from '@components/post';
import queryString from 'query-string';
import useAsync from '@hooks/useAsync';
import api from '@api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '@modules/auth';
import { useEffect } from 'react';
import { postsState } from '@modules/posts';

const PostListPage = () => {
  const auth = useRecoilValue(authState);
  const [posts, setPosts] = useRecoilState(postsState);
  const { search } = useLocation();
  const { page, username, tag } = queryString.parse(search);
  const {
    data: postList,
    error,
    loading,
  } = useAsync(
    () => api.posts.readPosts({ page, username, tag }),
    [page],
    false,
  );

  useEffect(() => {
    if (postList) {
      setPosts((p) => ({
        ...p,
        posts: postList.data,
        lastPage: parseInt(postList.headers['last-page']!, 10),
      }));
    }
  }, [postList, setPosts]);

  if (!postList) {
    return null;
  }

  return (
    <>
      <Header />
      <PostList
        posts={postList.data}
        error={error}
        loading={loading}
        showWriteButton={!!auth}
      />
      <Pagination
        username={username?.toString()!}
        tag={tag?.toString()!}
        page={page ? parseInt(page as string, 10) : 1}
        lastPage={posts.lastPage}
      />
    </>
  );
};

export default PostListPage;
