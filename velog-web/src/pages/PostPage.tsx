import React from 'react';
import PostViewer from '@components/post/PostViewer';
import HeaderContainer from '@containers/common/HeaderContainer';

interface Props {}

const PostPage = ({}: Props) => {
  return (
    <>
      <HeaderContainer />
      <PostViewer />
    </>
  );
};

export default PostPage;
