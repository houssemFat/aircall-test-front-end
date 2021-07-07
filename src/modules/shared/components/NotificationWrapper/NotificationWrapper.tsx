import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { CALLS_SUBSCRIPTION } from "../../../calls/graphql/calls.subscriptions";

/**
 * Listen to subscription and show user notification
 * @constructor
 */
export default function NotificationWrapper() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notificationsCount, setNotificationsCount] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data, loading} = useSubscription(
      CALLS_SUBSCRIPTION
  );
  if (data) {
    //console.log(data)

  }
  return (<div className={"modal"}>
    {

    }

  </div>)
}
