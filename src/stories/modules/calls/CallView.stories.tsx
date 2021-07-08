import { CallView } from "../../../modules/calls/components";
import { ComponentStory } from "@storybook/react";
import React from "react";
import ApolloIntelWrapper from "../../ProviderWrapper";
import { BrowserRouter as Router, MemoryRouter, Route, Switch } from "react-router-dom";
import StoreProvider from "../../../modules/shared/redux/store";


const CallViewWrapper = ({locale, id}: any) =>
    <ApolloIntelWrapper locale={locale}>
      <MemoryRouter initialEntries={['/calls/' + id]}>
        <Route
            component={(routerProps: any) => <StoreProvider> <CallView  {...routerProps} {...{locale}} />
            </StoreProvider>}
            path='/calls/:id'
        />
      </MemoryRouter>
    </ApolloIntelWrapper>

/**
 * Primary UI component for user interaction
 */
export default {
  title: 'Calls/ Details',
  component: CallViewWrapper,
  parameters: {
    docs: {
      description: {
        component: 'Get id from  https://frontend-test-api.aircall.io/graphql',
      },
    },
  },
  argTypes: {
    locale: {
      options: ['fr', 'en'],
      control: {type: 'radio'}
    },
    id: {control: 'text', placeholder : 'Get if from graphqL using playground'}
  },
}
//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof CallViewWrapper> = (args: any) => <CallViewWrapper  {...args}/>;


export const callDetails = Template.bind({});
callDetails.args = {'locale': 'fr', 'id': 'f52251ba-d7e7-4798-a727-ddd3593d531b'};
