import React from "react";
import { Call } from "../../models/calls";
import CallListItem from "./CallsListItem";

export interface ICallsDataProps {
  data: Array<Call>,
  onChildAction: Function,
  checkStatusByIds: { [key: number]: boolean; }
}

/**
 * Display simple list of calls
 * @param props
 * @constructor
 */
function CallsListStyleData(props: ICallsDataProps) {
  let {data, onChildAction, checkStatusByIds} = props;
  return (
      <div>

        {data.map((e: Call, index: number) =>
            <CallListItem onChildAction={onChildAction} checked={checkStatusByIds[e.id]} call={e} key={index}/>
        )}
      </div>
  );
}

export default CallsListStyleData;
