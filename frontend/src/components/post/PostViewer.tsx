import React from 'react';
import { AxiosError } from 'axios';
import styled from '@emotion/styled';
import palette from '@styles/palette';
import { Responsive, SubInfo, Tags } from '@components/common';
import { Post } from '@api/posts';

interface Props {
  loading: boolean;
  post: Post | null;
  error: AxiosError | null;
}

const PostViewer = ({ post, error, loading }: Props) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  if (loading || !post) {
    return null;
  }

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{post.title}</h1>
        <SubInfo
          username={post.user.username}
          publishedDate={post.publishedDate}
        />
        <Tags tags={post.tags} />
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: post.body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${palette.gray[2]};

  h1 {
    margin: 0;
    font-size: 3rem;
    line-height: 1.5;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;
