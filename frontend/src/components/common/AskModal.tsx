import React from 'react';
import styled from '@emotion/styled';
import Button from './Button';

interface Props {
  title: string;
  description: string;
  visible?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const AskModal = ({
  title,
  description,
  visible = false,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: Props) => {
  if (!visible) return null;

  return (
    <FullScreen>
      <AskModalBlock>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
          <StyledButton onClick={onConfirm}>{confirmText}</StyledButton>
        </div>
      </AskModalBlock>
    </FullScreen>
  );
};

export default AskModal;

const FullScreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.25);
`;

const AskModalBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);

  h2 {
    margin: 0 0 1rem;
  }

  p {
    margin-bottom: 3rem;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
`;
