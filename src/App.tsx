import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, IntlProvider } from 'react-intl';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './images/logo.svg';
// change layout given the auth state
import { DashboardLayout } from "./modules/shared/layouts";
import i18nMessages from "./i18n";
import { IRootState } from "./modules/shared/redux/store";
import { Flex, Typography } from '@aircall/tractor';

interface IProps {
  locale: string
}

const Greeting = () => <FormattedMessage id="common.welcome"/>;

class App extends React.Component<IProps> {
  render() {
    return (
        <IntlProvider messages={i18nMessages[this.props.locale]} locale={this.props.locale}
                      defaultLocale={this.props.locale}>
          <DashboardLayout>
            <Router>
              <Switch>
                <Route path={"/"}>
                  <Flex flexDirection="column" justifyContent="center">
                    <img src={logo} alt="logo"/>
                    <Typography mx="auto" pt="4" variant="heading2">
                      <Greeting/>🙂
                    </Typography>
                    <Link to={"/"}></Link>
                  </Flex>
                </Route>
              </Switch>
            </Router>
          </DashboardLayout>
        </IntlProvider>
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

