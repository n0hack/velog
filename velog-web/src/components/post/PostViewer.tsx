import Responsive from '@components/common/Responsive';
import styled from '@emotion/styled';
import palette from '@lib/styles/palette';
import React from 'react';

interface Props {}

const PostViewer = ({}: Props) => {
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>제목</h1>
        <SubInfo>
          <span>
            <b>tester</b>
          </span>
          <span>{new Date().toLocaleDateString()}</span>
        </SubInfo>
        <Tags>
          <div className="tag">#태그1</div>
          <div className="tag">#태그2</div>
          <div className="tag">#태그3</div>
        </Tags>
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{ __html: '<p>HTML <b>내용</b>입니다.</p>' }}
      />
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

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};

  /* span 사이에 가운뎃점 문자 보여주기 */
  span + span:before {
    padding: 0 0.25rem;
    color: ${palette.gray[5]};
    content: '\\B7';
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;

  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;

    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;
