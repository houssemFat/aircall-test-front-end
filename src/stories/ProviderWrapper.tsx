import { IntlProvider } from "react-intl";
import { apolloClient } from "../modules/shared/graphql/client";
import { ApolloProvider } from "@apollo/client";
import i18nMessages from "../i18n";
import React from "react";

const ApolloIntelWrapper = ({children, locale}: { children: React.ReactNode, locale: string }) => (
    <ApolloProvider client={apolloClient}>
      <IntlProvider messages={i18nMessages[locale]} locale={locale} defaultLocale={locale}>
        {children}
      </IntlProvider>
    </ApolloProvider>

)

export default ApolloIntelWrapper;
