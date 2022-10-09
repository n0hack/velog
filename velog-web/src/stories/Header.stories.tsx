import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from '@components/common/Header';

export default {
  title: 'Common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
