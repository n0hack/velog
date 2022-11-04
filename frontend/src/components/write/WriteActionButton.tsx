import { Button } from '@components/common';
import styled from '@emotion/styled';
import React from 'react';

interface Props {
  onPublish: () => void;
  onCancel: () => void;
}

const WriteActionButton = ({ onCancel, onPublish }: Props) => {
  return (
    <WriteActionButtonBlock>
      <StyledButton cyan onClick={onPublish}>
        포스트 등록
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonBlock>
  );
};

export default WriteActionButton;

const WriteActionButtonBlock = styled.div`
  margin: 1rem 0 3rem;

  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;

  & + & {
    margin-left: 0.5rem;
  }
`;