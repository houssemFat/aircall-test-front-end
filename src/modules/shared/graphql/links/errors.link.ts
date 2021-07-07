import { onError } from "@apollo/client/link/error";
import { apolloClient } from "../client";
import { TEMP_LOGIN } from "../mutations/auth.mutations";
import SESSIONSTORAGE_KEYS from "../../constants/sessionStorage";

interface TokenResult {
  access_token: string,
  user: {
    id: string,
    username: string
  }
}

interface TokenResultResponse {
  login: TokenResult
}

// this a temp solution for test purpose
const getToken = () => apolloClient.mutate({
  mutation: TEMP_LOGIN
});

// this a temp solution for test purpose
const storeToken = (token: string) => {
  sessionStorage.setItem(SESSIONSTORAGE_KEYS.TEMP_ACCESS_TOKEN, token);
}

const errorLink = onError(({graphQLErrors, networkError, operation, forward}) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions) {
        switch (err.extensions.exception.response.statusCode) {
            // Apollo Server sets code to UNAUTHENTICATED
            // when an AuthenticationError is thrown in a resolver
          case 401:
            // TODO, we should use a reliable way to handle the auth flow
            getToken().then((r) => {
                  let data = r.data;
                  storeToken((data as TokenResultResponse).login.access_token);
                }
            )
            return forward(operation);
        }
      } else {
        console.log(
            `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
        )
      }
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
export default errorLink;
