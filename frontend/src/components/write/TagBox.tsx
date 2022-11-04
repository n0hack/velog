import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import palette from '@styles/palette';

interface Props {
  tags: string[];
  onChangeField: (payload: {
    key: 'title' | 'body' | 'tags';
    value: string | string[];
  }) => void;
}

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

const TagBox = ({ tags, onChangeField }: Props) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState<string[]>([]);

  const insertTag = useCallback(
    (tag: string) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeField({ key: 'tags', value: nextTags });
    },
    [localTags, onChangeField],
  );

  const onRemove = useCallback(
    (tag: string) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeField({ key: 'tags', value: nextTags });
    },
    [localTags, onChangeField],
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
        <input
          placeholder="태그를 입력하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;

const TagBoxBlock = styled.div`
  width: 100%;
  padding-top: 2rem;
  border-top: 1px solid ${palette.gray[2]};

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
    outline: none;
    border: none;
  }

  input {
    min-width: 0;
    flex: 1;
    padding: 0.5rem;
  }

  button {
    padding: 0 1rem;
    font-weight: bold;
    color: white;
    background: ${palette.gray[8]};
    border: none;
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
