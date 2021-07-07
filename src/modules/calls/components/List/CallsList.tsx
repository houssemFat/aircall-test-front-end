import React from "react";
import {
  CallFilled,
  Divider,
  Dropdown,
  Flex,
  IconButton,
  ListOutlined,
  Menu,
  MenuItem, PreferencesOutlined,
  ShareScreenOutlined,
  Spacer, TextFieldInput,
  Tractor,
  Typography
} from "@aircall/tractor";
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { ViewStyle } from "../../models/types";
import  CallsListPage  from "./CallsList.page";
import { GroupDateValues } from "../../../shared/utils/DateHelpers";


interface IProps {
  query?: string,
  intl: IntlShape
}


interface IState {
  queryInputSearch:  string,
  viewStyle: ViewStyle,
  checkAllActionType: string,
  groupByProperty: GroupDateValues
}


const ListTitleMsg = () => <FormattedMessage id="calls.page.title"/>;
const GroupByDayMsg = () => <FormattedMessage id="calls.page.group_by.day"/>;
const GroupByWeekMsg = () => <FormattedMessage id="calls.page.group_by.week"/>;
const GroupByMonthMsg = () => <FormattedMessage id="calls.page.group_by.month"/>;


class CallsList extends React.Component<IProps, IState> {
  state = {
    queryInputSearch: '',
    viewStyle: ViewStyle.list,
    checkAllActionType: "none",
    groupByProperty: GroupDateValues.day,
  };

  updateListStyle = () => {
    this.setState({
      viewStyle: ViewStyle.list
    });
  };

  // update group
  // then group by
  updateGroupStyle = (groupByProperty: GroupDateValues) => {
    this.setState({
      viewStyle: ViewStyle.group,
      groupByProperty: groupByProperty
    });
  };

  updateQueryInputSearch = (queryInputSearch: string) => {
    this.setState({
      queryInputSearch: queryInputSearch
    });
  };


  render() {
    return (
        <Flex flexDirection="column" flexGrow={1} className="w-full">
          <Tractor>
            <div>
              <Spacer space="s" direction="vertical" py={20}>
                <Typography variant="displayM"><ListTitleMsg/></Typography>
              </Spacer>
            </div>
            <Flex flexDirection="column" borderRadius={3} bg={"white"} p={15} mt={10} flexGrow={1}>
              {/* Header  */}
              <Flex alignItems="center" width="100%" justifyContent="space-between">
                <Flex>
                  <Spacer direction="horizontal" space="xxs" alignItems={"center"}>
                    <TextFieldInput placeholder={this.props.intl.formatMessage({id: "calls.page.filter.by_phone"})}
                                    value={this.state.queryInputSearch}
                                    onChange={event => this.updateQueryInputSearch(event.target.value)}
                                    icon={CallFilled} size="small"/>
                  </Spacer>
                </Flex>
                <Flex justifyContent="center" alignItems="center" my="auto">
                  <Spacer direction="horizontal" space="xxs">
                    <Flex>
                      <IconButton onClick={() => this.updateListStyle()} size={24}
                                  component={ListOutlined}
                                  color={this.state.viewStyle === ViewStyle.list ? "primary.base" : "secondary.light"}/>

                      <Dropdown trigger={<IconButton size={24}
                                                     component={ShareScreenOutlined}
                                                     ml={2}
                                                     color={this.state.viewStyle === ViewStyle.group ? "primary.base" : "secondary.light"}/>}
                                position="bottom" anchor="end">
                        <Menu>
                          <MenuItem onClick={() => this.updateGroupStyle(GroupDateValues.day)}>
                            <GroupByDayMsg/></MenuItem>
                          <MenuItem
                              onClick={() => this.updateGroupStyle(GroupDateValues.week)}><GroupByWeekMsg/></MenuItem>
                          <MenuItem
                              onClick={() => this.updateGroupStyle(GroupDateValues.month)}><GroupByMonthMsg/></MenuItem>
                        </Menu>
                      </Dropdown>

                    </Flex>
                    <Divider orientation="vertical"/>
                    {/* TODO alignItems={"center"} hide the divider, so we use margin instead  */}
                    <Flex>
                      <PreferencesOutlined/>
                    </Flex>
                  </Spacer>
                </Flex>
              </Flex>

              {/* List Container  */}

              <Flex width="100%" flexDirection="column" flexGrow={1} py={10}>
                <Flex justifyContent="center" alignItems="center" width="100%" flexGrow={1}>
                  <CallsListPage viewStyle={this.state.viewStyle}
                                 groupByProperty={this.state.groupByProperty}
                                 queryInputSearch={this.state.queryInputSearch}/>
                </Flex>
              </Flex>
            </Flex>
          </Tractor>
        </Flex>
    );
  }
}

export default injectIntl(CallsList);
