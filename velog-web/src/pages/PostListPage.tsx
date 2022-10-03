import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const PostListPage = ({}: Props) => {
  const params = useParams();
  console.log(params);
  return <div>PostListPage</div>;
};

export default PostListPage;
