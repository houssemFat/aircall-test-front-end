import { CallsList } from "../../../modules/calls/components";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ApolloIntelWrapper from "../../ProviderWrapper";


const CallListWrapper = ({locale}: { locale: string }) => <ApolloIntelWrapper
    locale={locale}><CallsList/></ApolloIntelWrapper>;

export default {
  title: 'Calls/ List',
  component: CallListWrapper,
  parameters: {
    docs: {
      description: {
        component: 'See test here  https://github.com/aircall/frontend-hiring-test',
      },
    },
  },
  argTypes: {
    locale: {
      options: ['fr', 'en'],
      control: {type: 'radio'}
    }
  },
};

const Template: ComponentStory<typeof CallListWrapper> = (args) => <CallListWrapper {...args} />;

export const callsList= Template.bind({});
callsList.args = {'locale': 'fr'};
