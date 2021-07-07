import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { CALLS_SUBSCRIPTION } from "../../../calls/graphql/calls.subscriptions";


export default function NotificationWrapper() {
  const [count, setCount] = useState(0)
  const {data, loading} = useSubscription(
      CALLS_SUBSCRIPTION
  );
  if (data) {
    console.log(data)

  }
  return (<div className={"modal"}>
    {

    }

  </div>)
}
