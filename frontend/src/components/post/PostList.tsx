import { Post } from '@api/posts';
import { Button, Responsive, SubInfo, Tags } from '@components/common';
import styled from '@emotion/styled';
import palette from '@styles/palette';
import { AxiosError } from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  posts: Post[] | null;
  error: AxiosError | null;
  loading: boolean;
  showWriteButton?: boolean;
}

const PostItem = ({ post }: { post: Post }) => {
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${post.user.username}/${post._id}`}>{post.title}</Link>
      </h2>
      <SubInfo
        username={post.user.username}
        publishedDate={new Date(post.publishedDate).toLocaleDateString()}
      />
      <Tags tags={post.tags} />
      <p>{post.body}</p>
    </PostItemBlock>
  );
};

const PostList = ({
  posts,
  error,
  loading,
  showWriteButton = false,
}: Props) => {
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      <div>
        {!loading &&
          posts &&
          posts.map((post) => <PostItem post={post} key={post._id} />)}
      </div>
    </PostListBlock>
  );
};

export default PostList;

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding: 3rem 0;

  /* 첫 번째 포스트는 패딩 제거 */
  &:first-of-type {
    padding-top: 0;
  }

  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    margin: 0;
    font-size: 2rem;

    &:hover {
      color: ${palette.gray[6]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;
