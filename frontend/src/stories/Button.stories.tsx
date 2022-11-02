import Button from '@components/common/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default = () => {
  return <Button>버튼</Button>;
};
