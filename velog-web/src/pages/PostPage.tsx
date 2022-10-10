import React from 'react';
import HeaderContainer from '@containers/common/HeaderContainer';
import PostViewerContainer from '@containers/post/PostViewerContainer';

interface Props {}

const PostPage = ({}: Props) => {
  return (
    <>
      <HeaderContainer />
      <PostViewerContainer />
    </>
  );
};

export default PostPage;
