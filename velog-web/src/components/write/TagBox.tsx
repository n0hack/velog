import styled from '@emotion/styled';
import palette from '@lib/styles/palette';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  tags: string[];
  onChangeTags: (nextTags: string[]) => void;
}

// 렌더링 최적화를 위해 컴포넌트 분리 (input이 변경될 때, 태그 목록이 변경될 때)
const TagItem = React.memo(
  ({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) => (
    <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
  ),
);

const TagList = React.memo(
  ({ tags, onRemove }: { tags: string[]; onRemove: (tag: string) => void }) => (
    <TagListBlock>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} onRemove={onRemove} />
      ))}
    </TagListBlock>
  ),
);

const TagBox = ({ tags, onChangeTags }: Props) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState<string[]>([]);

  const insertTag = useCallback(
    (tag: string) => {
      // 공백이거나 이미 존재하는 태그라면 추가하지 않음
      if (!tag) return;
      if (localTags.includes(tag)) return;
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    (tag: string) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      insertTag(input.trim());
      setInput('');
    },
    [input, insertTag],
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input placeholder="태그를 입력하세요" onChange={onChange} />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
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
