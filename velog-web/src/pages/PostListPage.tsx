import Button from '@components/common/Button';
import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const PostListPage = ({}: Props) => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <Button>테스트 버튼</Button>
    </div>
  );
};

export default PostListPage;
