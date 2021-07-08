// Footer.stories.tsx

import React from 'react';
import { ComponentStory } from "@storybook/react";
import StoreProvider from "../../../modules/shared/redux/store";
import Footer from "../../../modules/shared/components/Footer/Footer";

let FooterWrapper = () => <StoreProvider><Footer /></StoreProvider>
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Shared/ Footer',
  component: FooterWrapper,
  argTypes: {
    locale: {
      options: ['fr', 'en'],
      control: {type: 'radio'}
    }
  },
};

//👇 We create a “template” of how args map to rendering
const Template : ComponentStory<typeof FooterWrapper> = (args) => <FooterWrapper />;


export const footer = Template.bind({});
footer.args = {'locale': 'fr'};
