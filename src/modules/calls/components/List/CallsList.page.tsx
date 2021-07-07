import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from 'react';
import {
  Button,
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
import { ARCHIVE_CALL_MUTATION } from "../../graphql/calls.mutations";


// Store check status by id of call
// move this to state or store to be shared with list and group
let checkStatusByIds: { [key: string]: boolean; } = {};
let bulkIdsToArchive: string[] = [];

interface BulkArchiveButtonProps {
  onAction: Function
}

const ArchiveMsg = () => <FormattedMessage id="calls.actions.archive"/>;

/**
 *
 * @param call
 * @param onAction
 */
function BulkArchiveButton({onAction}: BulkArchiveButtonProps) {

  return (
      <Flex>
        <Flex>
          <Spacer space="0" p={0}>
            <Button
                variant={"destructive"}
                size={"xSmall"}
                onClick={() => {
                  onAction({operation: 'bulk_archive'});
                }}>

              <ArchiveMsg/>
            </Button>
          </Spacer>
        </Flex>
      </Flex>

  )
}

interface IListCallsHeaderProps {
  onCheck: Function,
  showCheckAction: boolean,
  onBulkArchiveStart: Function
  onBulkArchiveEnd: Function
}

/**
 * Header for the page list
 * @param onCheck
 * @param onBulkArchiveStart
 * @param onBulkArchiveEnd
 * @param showCheckAction
 * @constructor
 */
function ListCallsHeader({onCheck, onBulkArchiveStart, onBulkArchiveEnd, showCheckAction}: IListCallsHeaderProps) {
  const [archive, loading] = useMutation(ARCHIVE_CALL_MUTATION);
  const [bulkAchieving, setBulkArchiving] = useState(false);
  let onArchive = () => {
    bulkIdsToArchive = Object.keys(checkStatusByIds).filter((key: string) => checkStatusByIds[key]);
    setBulkArchiving(true);
    onBulkArchiveStart();
  }
  let archiveOne = (id: string | undefined) => {
    if (id) {
      // FIXME , we should set a little time to browser to handle loop
      // Find better way to handle calls
      setTimeout(() => {
        archive({variables: {id: id}})
      }, 200);
    }
  }

  if (bulkAchieving) {
    if (bulkIdsToArchive.length) {
      archiveOne(bulkIdsToArchive.pop());
    } else {
      setBulkArchiving(false);
      // Fixme
      // Find a better way to handle this
      // https://github.com/facebook/react/issues/18178#issuecomment-595846312
      setTimeout(() => {
        onBulkArchiveEnd();
      }, 200);
    }
  }

  return <Flex flexDirection={"column"}>
    <Flex className={"page-row"}>
      <Flex className={ListFieldStyle.checkbox}>
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
          <Flex>
            <Checkbox size="small" disabled checked={false}>
            </Checkbox>
            <Flex>
              <Dropdown
                  trigger={<DropdownButton mode="link" variant="primary" size="xSmall"
                                           iconClose={<ChevronDownOutlined/>}>

                  </DropdownButton>} position="right" anchor="start">
                <Menu>
                  {Object.keys(CheckAllActionType).map((action, index) => <MenuItem key={index}
                                                                                    onClick={() => onCheck(action)}>{action}</MenuItem>)}
                </Menu>
              </Dropdown>
            </Flex>
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
    {showCheckAction ?
        <Flex py={10}>
          <BulkArchiveButton onAction={onArchive}/> <Flex p={2}>{bulkAchieving ? 'Archiving ...' : null}</Flex>
        </Flex> : ""
    }
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
const CallsListPage = ({
                         viewStyle,
                         groupByProperty,
                         queryInputSearch,
                       }: ICallsDataContentProps) => {

  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [offset, setOffset] = useState(0);
  const [check, setCheck] = useState(CheckAllActionType.none);
  const {loading, error, data, refetch} = useQuery(PAGINATED_CALLS_QUERY, {
    variables: {
      offset: offset || 0,
      limit: pageSize,
    }
  });

  // show a mask progress
  function onBulkArchiveStart() {

  }

  // show a mask
  function onBulkArchiveEnd() {
    setCheck(CheckAllActionType.none);
    refetch()
  }

  function onChildAction(event: { operation: string, payload: any }) {
    if (event.operation === 'archive') {
      refetch();
    }
    if (event.operation === 'check') {
      const {id} = event.payload;
      checkStatusByIds[id] = !checkStatusByIds[id]
    }
  }

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
    return <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <Flex py={4}>Error token :( </Flex>
      <Button size="small"
              id="error_loading"
              variant="primary"
              onClick={(event) => {
                // TODO , fixme :
                //  this is just a hack to get new token
                window.location.reload();
              }}>
        <FormattedMessage id="common.retry"/>
      </Button>
    </Flex>

  }

  const paginatedCalls = data.paginatedCalls;
  let newList = paginatedCalls.nodes;
  let totalCount = paginatedCalls.totalCount;
  let pagesCount = Math.ceil(totalCount / pageSize);

  //

  let checkStatus = null;
  if (newList) {
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
  }


  // show or hide actions
  let showCheckAction = !!Object.values(checkStatusByIds).find(e => e)

  // TODO, move the filter outside
  if (queryInputSearch) {
    newList = newList.filter((e: Call) => {
      return (e.to.indexOf(queryInputSearch) > -1 || e.from.indexOf(queryInputSearch) > -1)
    })
  }

  // At least one checked


  return (
      <Flex flexDirection="column" height={"100%"} flexGrow={1}>
        <Flex flexDirection="column" flexGrow={1} width={"100%"}>
          {/* header  */}
          <ListCallsHeader onCheck={setCheck}
                           onBulkArchiveEnd={onBulkArchiveEnd}
                           onBulkArchiveStart={onBulkArchiveStart}
                           showCheckAction={showCheckAction}/>
          {/* onChildAction we can intercept multiple actions here, but because we have only the archive action
                we just call refresh */}
          {
            viewStyle === ViewStyle.list ? <CallsListStyleData
                    data={newList}
                    checkStatusByIds={checkStatusByIds}
                    onChildAction={onChildAction}/> :
                <CallsListGroupData
                    groupByProperty={groupByProperty}
                    checkStatusByIds={checkStatusByIds}
                    data={newList}
                    onChildAction={onChildAction}/>
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

export default CallsListPage
