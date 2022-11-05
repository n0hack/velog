import React from 'react';
import { AskModal } from '@components/common';

interface Props {
  visible?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const AskRemoveModal = ({ visible = false, onConfirm, onCancel }: Props) => {
  return (
    <AskModal
      visible={visible}
      title="포스트 삭제"
      description="포스트를 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;
