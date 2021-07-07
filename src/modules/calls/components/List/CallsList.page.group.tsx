import React, { useState } from "react";
import { Call } from "../../models/calls";
import CallListItem from "./CallsListItem";
import { groupByDate, GroupDateValues } from "../../../shared/utils/DateHelpers";
import { Accordion, Box, Typography } from "@aircall/tractor";
import { injectIntl, IntlShape } from "react-intl";

interface ICallsGroupEntryProps {
  key: string,
  label: string,
  elements: [Call],
  index: number,
  onChildAction: Function,
  checkStatusByIds: { [key: number]: boolean; }
}

/**
 *
 * @param {ICallsGroupEntryProps} props
 * @constructor
 */
function RenderGroup(props: ICallsGroupEntryProps) {
  const [activeId, setActiveId] = useState(props.index);
  const {index, onChildAction, checkStatusByIds, label} = props;
  // @ts-ignore
  return <Accordion.Container selected={activeId} onChange={setActiveId} key={index}>
    <Accordion.Item id={index}>
      <Accordion.Header>
        <Box backgroundColor={activeId === index ? 'blue' : '#fff'} p="s" width="100%" cursor="pointer">
          <Typography>{label}</Typography>
        </Box>
      </Accordion.Header>
      <Accordion.Body>
        {props.elements.map((e, index: number) => <CallListItem
            checked={checkStatusByIds[e.id]}
            onChildAction={onChildAction} call={e} key={index}/>)}
      </Accordion.Body>
    </Accordion.Item>
  </Accordion.Container>
}

export interface ICallsDataProps {
  data: Array<Call>,
  onChildAction: Function,
  groupByProperty: GroupDateValues,
  checkStatusByIds: { [key: number]: boolean; },
  intl: IntlShape
}

/**
 * Render list in grouped style
 * @param data
 * @param onChildAction
 * @param checkStatusByIds
 * @param groupByProperty
 * @param intl
 * @constructor
 */
function CallsListGroupData({data, onChildAction, checkStatusByIds, groupByProperty, intl}: ICallsDataProps) {

  let groups = groupByDate(data, 'created_at', {
    groupBy: groupByProperty,
    locale: intl.locale
  });
  return (
      <div>
        <Box>
          {groups.map((e, index: number) =>
              <RenderGroup
                  checkStatusByIds={checkStatusByIds}
                  onChildAction={onChildAction}
                  index={index + 1}
                  key={e.key}
                  label={e.label}
                  elements={e.elements as [Call]}/>)}
        </Box>
      </div>
  );
}

export default injectIntl(CallsListGroupData);
