import Button from '@components/common/Button';
import Header from '@components/common/Header';
import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const PostListPage = ({}: Props) => {
  const params = useParams();

  return (
    <>
      <Header />
      <Button>테스트 버튼</Button>
    </>
  );
};

export default PostListPage;
