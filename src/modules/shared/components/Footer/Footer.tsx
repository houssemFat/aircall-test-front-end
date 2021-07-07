import React from 'react'
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Spacer, FlagFra, FlagUsa, Flex, Button, Tractor } from '@aircall/tractor';


import { IRootState } from '../../redux/store';
import { updateLocale } from "./footer.actions";

interface IProps {
  updateLocaleEvent: Function,
  locale: string
}


class Footer extends React.Component<IProps> {


  updateLocale = (locale: any) => {
    this.props.updateLocaleEvent(locale)
  };

  render() {
    let locale = this.props.locale;

    return (
        <Flex justifyContent={"center"} pb="2" mt="4">
          <Spacer space="s">

              <FlagUsa id={"footer_i18n_usa"} className={"cursor-pointer"} width={locale === 'en' ? 24 : 18}
                     onClick={() => this.updateLocale("en")}/>
            <FlagFra  id={"footer_i18n_fr"}  className={"cursor-pointer"} width={locale === 'fr' ? 24 : 18}
                     onClick={() => this.updateLocale("fr")}/>

          </Spacer>
        </Flex>
    )
  }
}


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // dispatching plain actions
    updateLocaleEvent: (locale: string) => dispatch(updateLocale(locale)),
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    locale: state.intlReducer.locale
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(
    Footer)
