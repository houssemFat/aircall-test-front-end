import { useQuery } from "@apollo/client";
import React, { useState } from 'react';
import {
  Checkbox, ChevronDownOutlined,
  Divider,
  Dropdown,
  DropdownButton,
  Flex,
  Menu,
  MenuItem,
  Skeleton,
  Spacer,
  Typography
} from "@aircall/tractor";
import { FormattedMessage } from "react-intl";

import { PAGINATED_CALLS_QUERY } from "../../graphql/calls.queries";
import CallsListStyleData from "./CallsList.page.list";
import CallsListGroupData from "./CallsList.page.group";
import { CheckAllActionType, LIST_COLUMNS, ListFieldStyle, ViewStyle } from "../../models/types";
import { Call } from "../../models/calls";
import Pagination from "../../../shared/components/Pagination/Pagination";
import { GroupDateValues } from "../../../shared/utils/DateHelpers";


// Store check status by id of call
// move this to state or store to be shared with list and group
let checkStatusByIds: { [key: number]: boolean; } = {};

interface IListCallsHeaderProps {
  onCheck: Function
}

/**
 * Header for the page list
 * @param onCheck
 * @constructor
 */
function ListCallsHeader({onCheck}: IListCallsHeaderProps) {
  return <Flex className={"page-row"}>
    <Flex className={ListFieldStyle.checkbox}>
      <Flex justifyContent="center" alignItems="center">
        <Checkbox size="small" disabled checked={false}>
        </Checkbox>
        <Flex>
          <Dropdown
              trigger={<DropdownButton mode="link" variant="primary" size="xSmall"
                                       iconClose={<ChevronDownOutlined/>}>

              </DropdownButton>} position="bottom" anchor="end">
            <Menu>
              {Object.keys(CheckAllActionType).map((action, index) => <MenuItem key={index}
                                                                                onClick={() => onCheck(action)}>{action}</MenuItem>)}
            </Menu>
          </Dropdown>
        </Flex>

      </Flex>
    </Flex>
    <Flex className={'xs:hidden'} flexGrow={1}>
      {
        LIST_COLUMNS.map((column, index) =>
            <Flex key={index} className={column.fieldType}>
              <Typography variant="subheading"><FormattedMessage id={"call.fields." + column.label}/></Typography>
            </Flex>)
      }
    </Flex>
  </Flex>
      ;
}

const defaultPageSize = 10;

interface ICallsDataContentProps {
  viewStyle: ViewStyle,
  groupByProperty: GroupDateValues,
  queryInputSearch: string
}

/**
 * Render page of calls
 * @param viewStyle
 * @param groupByProperty
 * @param queryInputSearch
 * @constructor
 */
export const CallsListPage = ({viewStyle, groupByProperty, queryInputSearch}: ICallsDataContentProps) => {

  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [offset, setOffset] = useState(0);
  const [check, setCheck] = useState(CheckAllActionType.none);

  const {loading, error, data, refetch} = useQuery(PAGINATED_CALLS_QUERY, {
    variables: {
      offset: offset || 0,
      limit: pageSize,
    }
  });

  if (loading) {
    return <Spacer space="s" p="16px 0" borderRadius={8} width={"100%"} margin={"auto"} alignItems="center"
                   direction="vertical">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {Array.from(Array(5)).map((_, index) => {
        return <Flex key={index}>
          <Spacer space="m" py={20}>
            <Skeleton width={120} height={16}/>
            <Skeleton width={120} height={16}/>
            <Skeleton width={120} height={16}/>
            <Skeleton width={120} height={16}/>
            <Skeleton width={120} height={16}/>
          </Spacer>

        </Flex>
      })
      }
    </Spacer>;
  }
  if (error) {
    return <p>Error :(</p>;
  }
  const paginatedCalls = data.paginatedCalls;
  let newList = paginatedCalls.nodes;
  let totalCount = paginatedCalls.totalCount;
  let pagesCount = Math.ceil(totalCount / pageSize);

  // reset
  checkStatusByIds = {};
  let checkStatus = null;
  // TODO, find a better way to handle the check state
  newList.forEach((e: Call) => {
    switch (check) {
      case CheckAllActionType.all :
        checkStatus = true;
        break;
      case CheckAllActionType.none :
        checkStatus = false;
        break;
      case CheckAllActionType.archived :
        checkStatus = e.is_archived;
        break;
      case CheckAllActionType.not_archived :
        checkStatus = !e.is_archived;
        break;
    }
    checkStatusByIds[e.id] = checkStatus;
  })

  // TODO, move the filter outside
  if (queryInputSearch) {
    newList = newList.filter((e: Call) => {
      return (e.to.indexOf(queryInputSearch) > -1 || e.from.indexOf(queryInputSearch) > -1)
    })
  }

  return (
      <Flex flexDirection="column" height={"100%"} flexGrow={1}>
        <Flex flexDirection="column" flexGrow={1} width={"100%"}>
          {/* header  */}
          <ListCallsHeader onCheck={setCheck}/>
          {/* onChildAction we can intercept multiple actions here, but because we have only the archive action
                we just call refresh */}
          {
            viewStyle === ViewStyle.list ? <CallsListStyleData
                    data={newList}
                    checkStatusByIds={checkStatusByIds}
                    onChildAction={refetch}/> :
                <CallsListGroupData
                    groupByProperty={groupByProperty}
                    checkStatusByIds={checkStatusByIds}
                    data={newList}
                    onChildAction={refetch}/>
          }
        </Flex>
        {/* pagination */}
        <Flex alignItems="center" width="100%" className={"xs:flex-column"}
              flexDirection={"row-reverse"}
              justifyContent="space-between" py={2}>

          <Flex>
            <Spacer direction="horizontal" alignItems={"center"} space="xxs">
              <Spacer space="s" alignItems={"center"}>

                <Typography
                    variant="subheading2">{offset + 1} / {pagesCount}</Typography>
                <Divider orientation="vertical"/>

                <Pagination offset={offset}
                            pagesCount={pagesCount}
                            onNext={() => setOffset(offset + 1)}
                            onPrevious={() => setOffset(offset - 1)}/>
              </Spacer>
            </Spacer>
          </Flex>

          <Flex flexDirection="column" pt={2}>
            <Dropdown
                trigger={<DropdownButton block={true}>{pageSize}</DropdownButton>}>
              <Menu>
                {[10, 20, 30, 100].map((size, index) => <MenuItem key={index}
                                                                  onClick={() => setPageSize(size)}>{size}</MenuItem>)}
              </Menu>
            </Dropdown>


          </Flex>

        </Flex>
      </Flex>

  )
}
