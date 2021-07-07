import React  from "react";
import {
  Spacer,
  ArchiveOutlined,
  CounterBadge,
  Flex,
  ToDoOutlined,
  SpinnerOutlined,
  SquircleButton, OutboundOutlined, InboundOutlined, Tag, Checkbox, CallFilled, Typography
} from "@aircall/tractor";
import { useHistory } from 'react-router';
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { useMutation } from "@apollo/client";
import { format, formatDistance } from 'date-fns'

import { ARCHIVE_CALL_MUTATION } from "../../graphql/calls.mutations";
import { dateFnsLocalesByAppLocale, HumanizeMilleSeconds } from "../../../shared/utils/DateHelpers";
import { Call } from "../../models/calls";
import { ListFieldStyle } from "../../models/types";


const IsArchivedMessage = () => <FormattedMessage id="call.fields.is_archived"/>;

interface CallsListItemProps {
  call: Call,
  onChildAction: Function,
  intl: IntlShape,
  checked : boolean
}

/**
 * Render a single item of list
 * @param call
 * @param intl
 * @param checked
 * @param onChildAction
 * @constructor
 */
const CallListItem = ({call, intl, checked, onChildAction}: CallsListItemProps) => {
  const [archive, {loading}] = useMutation(ARCHIVE_CALL_MUTATION);
  const history = useHistory();
  const locale = intl.locale;
  // data of type @see PaginatedCalls
  //{/*{)}*/}
  return (
      <Flex className={"page-row page-row-data cursor-pointer"} alignItems={"center"} onClick={() => {
        history.push('/calls/' + call.id)
      }}>
        <Flex className={ListFieldStyle.checkbox} onClick={event => {
          event.stopPropagation();
        }}>
          <Checkbox
              checked={checked}
              onChange={newStatus => {
                onChildAction({operation: 'check', payload: {id: call.id, checked: newStatus}})
              }}/>
        </Flex>
        <Flex className={"xs:flex-column xs:align-items-left"} flexGrow={1} alignItems={"center"}>

          <Flex className={ListFieldStyle.phone}>
            <Spacer space="0" alignItems={"center"}>
              <CallFilled width={18}/>
              {call.from}
            </Spacer>
          </Flex>

          <Flex className={ListFieldStyle.phone + ' xs:hidden'}>
            {call.to}
          </Flex>

          <Flex className={ListFieldStyle.text + ' xs:hidden'}>
            {call.direction === "outbound" ? <OutboundOutlined color={"red.base"}/> :
                <InboundOutlined color={"green.light"}/>}
          </Flex>

          <Flex className={ListFieldStyle.text + ' xs:hidden'}>
            {HumanizeMilleSeconds(call.duration)}
          </Flex>

          {/*<Flex width="120px">
          {
            call.is_archived ? <Box bg="red.dark" color={"white"} borderRadius={8} px={2} pb={.5}>
              <Typography variant="caption2"><IsArchivedMessage/></Typography>
            </Box> : ''
          }

        </Flex>
        */}<Flex className={ListFieldStyle.text + ' xs:hidden'}>
          {
            call.is_archived ? <Tag size="small" variant="red">
              <IsArchivedMessage/>
              {/*<TrashFilled size="12px" />*/}
            </Tag> : ''

          }

        </Flex>
          <Flex className={ListFieldStyle.createdAt} flexDirection={"column"}>

            {
              formatDistance(
                  new Date(),
                  new Date(call.created_at),
                  {locale: dateFnsLocalesByAppLocale[locale]} // Pass the locale as an option
              )}
            <Typography variant="overline2"
                        pt={2}>{format(new Date(call.created_at), 'iii HH:MM:SS', {locale: dateFnsLocalesByAppLocale[locale]})}</Typography>
          </Flex>
          <Flex className={ListFieldStyle.icon + ' xs:hidden'}>
            <CounterBadge size="small" count={call.notes.length}>
              <ToDoOutlined size="24px" color="blue.base"/>
            </CounterBadge>
          </Flex>

        </Flex>
        <Flex>
          <Flex className={ListFieldStyle.text}>
            <Spacer space="0" p={0}>
              <SquircleButton
                  onClick={(event) => {
                    event.stopPropagation()
                    archive({variables: {id: call.id}})
                    onChildAction({operation: 'archive', payload: {id: call.id}})
                  }} size="xSmall" icon={loading ? SpinnerOutlined : ArchiveOutlined} variant="default" shadow={false}
                  spin={loading}/>

            </Spacer>
          </Flex>
        </Flex>
      </Flex>
  );
}
export default  injectIntl(CallListItem);
