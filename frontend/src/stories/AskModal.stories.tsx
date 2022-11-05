import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AskModal } from '@components/common';

export default {
  title: 'common/AskModal',
  component: AskModal,
  argTypes: {
    title: { description: '모달의 제목을 설정합니다.' },
    description: { description: '모달의 내용을 설정합니다.' },
    visible: { description: '모달의 렌더링 여부를 설정합니다.' },
    confirmText: { description: '확인 버튼의 텍스트를 설정합니다.' },
    cancelText: { description: '취소 버튼의 텍스트를 설정합니다.' },
    onConfirm: {
      description: '확인 버튼을 클릭했을 때 실행할 함수를 설정합니다.',
    },
    onCancel: {
      description: '취소 버튼을 클릭했을 때 실행할 함수를 설정합니다.',
    },
  },
} as ComponentMeta<typeof AskModal>;

const Template: ComponentStory<typeof AskModal> = (args) => (
  <AskModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: '타이틀',
  description: '모달 설명',
  visible: true,
};
