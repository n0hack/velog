import React from 'react';
import styled from '@emotion/styled';
import palette from '@styles/palette';

interface Props {
  onEdit: () => void;
}

const PostActionButton = ({ onEdit }: Props) => {
  return (
    <PostActionButtonBlock>
      <ActionButton onClick={onEdit}>수정</ActionButton>
      <ActionButton>삭제</ActionButton>
    </PostActionButtonBlock>
  );
};

export default PostActionButton;

const PostActionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -1.5rem 0 2rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  color: ${palette.gray[6]};
  font-size: 0.875rem;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${palette.cyan[7]};
    background: ${palette.gray[1]};
  }

  & + & {
    margin-left: 0.25rem;
  }
`;
