import { gql } from "@apollo/client";

export const CALLS_SUBSCRIPTION = gql`
  subscription{onUpdatedCall{id, from}}
`;

