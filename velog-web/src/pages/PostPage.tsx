import { css } from '@emotion/react';
import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const PostPage = ({}: Props) => {
  const params = useParams();
  console.log(params);
  return (
    <div
      css={css`
        color: red;
      `}
    >
      PostPage
    </div>
  );
};

export default PostPage;
