import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '@components/common/Button';

export default {
  title: 'Common/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    children: { description: '버튼의 텍스트를 설정' },
    fullWidth: { description: '버튼의 너비를 100%로 설정' },
    cyan: { description: '버튼의 색상을 cyan으로 설정' },
    style: { description: '버튼의 스타일을 설정' },
    onClick: { description: '버튼을 클릭했을 때 실행할 함수를 설정' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Cyan = Template.bind({});
Cyan.args = {
  cyan: true,
};
