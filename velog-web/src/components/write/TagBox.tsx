import styled from '@emotion/styled';
import palette from '@lib/styles/palette';
import React from 'react';

interface Props {}

// 렌더링 최적화를 위해 컴포넌트 분리 (input이 변경될 때, 태그 목록이 변경될 때)
const TagItem = React.memo(({ tag }: { tag: string }) => <Tag>#{tag}</Tag>);

const TagList = React.memo(({ tags }: { tags: string[] }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} />
    ))}
  </TagListBlock>
));

const TagBox = ({}: Props) => {
  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm>
        <input placeholder="태그를 입력하세요" />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={['태그1', '태그2', '태그3']} />
    </TagBoxBlock>
  );
};

export default TagBox;

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;

  h4 {
    color: ${palette.gray[8]};
    margin: 0 0 0.5rem;
  }
`;

const TagForm = styled.form`
  width: 256px;
  display: flex;
  border: 1px solid ${palette.gray[9]};
  border-radius: 4px;
  overflow: hidden;

  input,
  button {
    font-size: 1rem;
    border: 0;
    outline: 0;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  button {
    padding: 0 1rem;
    color: white;
    font-weight: bold;
    background: ${palette.gray[8]};
    border: 0;
    cursor: pointer;

    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
