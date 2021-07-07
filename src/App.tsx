import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { CallFilled, Tractor, Button, Flex, Typography } from '@aircall/tractor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  ApolloProvider
} from "@apollo/client";


import logo from './images/logo.svg';
// change layout given the auth state
import { DashboardLayout } from "./modules/shared/layouts";
import i18nMessages from "./i18n";
import { IRootState } from "./modules/shared/redux/store";
import { CallsList, CallView } from "./modules/calls/components";
import { apolloClient } from "./modules/shared/graphql/client";
import NotificationWrapper from "./modules/shared/components/NotificationWrapper/NotificationWrapper";

interface IProps {
  locale: string
}


const Greeting = () => <FormattedMessage id="common.welcome"/>;
const Calls = () => <FormattedMessage id="common.calls"/>;


class App extends React.Component<IProps> {
  render() {
    return (
        <ApolloProvider client={apolloClient}>
          <IntlProvider messages={i18nMessages[this.props.locale]} locale={this.props.locale}
                        defaultLocale={this.props.locale}>
            <DashboardLayout>
              <Flex flexDirection="column" flexGrow={1} height={"100%"}>
                <Router>
                  <Switch>
                    {/* move all call to one route for calls  */}
                    <Route path="/calls/:id">
                      <CallView/>
                    </Route>
                    <Route path="/calls">
                      <CallsList query={""}/>
                    </Route>
                    <Route path={"/"}>
                      <Flex flexDirection="column" justifyContent="center" flexGrow={1} width={"400px"} m={"auto"}>
                        <img src={logo} alt="logo"/>
                        <Typography mx="auto" pt="4" variant="heading2">
                          <Greeting/>🙂
                        </Typography>
                        <Flex justifyContent="center" pt="4" alignItems="center">
                          <Link to={"/calls"}>
                            <Tractor>
                              <Button mode="link">
                                <CallFilled width={18}/> <Calls/>
                              </Button>
                            </Tractor>
                          </Link>

                        </Flex>
                      </Flex>
                    </Route>
                  </Switch>
                </Router>

              </Flex>
              <NotificationWrapper/>
            </DashboardLayout>
          </IntlProvider>
        </ApolloProvider>
    );
  }
}

/*

const mapStateToProps: MapStateToProps<any, any> = (state: any) => ({
    locale: state.intlReducer.locale
})

 */
const mapStateToProps = (state: IRootState) => {
  return {
    locale: state.intlReducer.locale
  }
};
export default connect(mapStateToProps)(App)

