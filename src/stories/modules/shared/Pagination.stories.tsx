// Footer.stories.tsx

import React from 'react';
import { ComponentStory } from "@storybook/react";
import ApolloIntelWrapper from "../../ProviderWrapper";
import { CallsList } from "../../../modules/calls/components";
import Pagination from "../../../modules/shared/components/Pagination/Pagination";
import { Tractor } from "@aircall/tractor";

const PaginationWrapper = ({locale, offset, pagesCount}: { locale: string, offset: number, pagesCount: number }) =>
    <ApolloIntelWrapper
        locale={locale}><Tractor><Pagination offset={offset} pagesCount={pagesCount}/></Tractor></ApolloIntelWrapper>;
//👇 This default export determines where your story goes in the story list
export default {
  title: 'Shared/ Pagination',
  component: PaginationWrapper,
  argTypes: {
    offset: {control: 'number'},
    pagesCount: {control: 'number'},
    locale: {
      options: ['fr', 'en'],
      control: {type: 'radio'}
    }
  },
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PaginationWrapper> = (args) => <PaginationWrapper {...args}/>;


export const pagination = Template.bind({});
pagination.args = {'offset': 0, 'pagesCount': 20, 'locale' : 'fr'};
