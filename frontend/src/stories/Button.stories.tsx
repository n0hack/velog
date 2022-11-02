import Button from '@components/common/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'common/Button',
  component: Button,
  args: {
    children: '버튼',
  },
  argTypes: {
    fullWidth: {
      description: '버튼의 너비를 100%로 설정합니다.',
    },
    cyan: {
      description: '버튼의 색상을 cyan으로 설정합니다.',
    },
    style: {
      description: '버튼에 적용할 CSS를 설정합니다.',
    },
    onClick: {
      description: '버튼을 클릭했을 때 실행할 함수를 설정합니다.',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};
