import { gql} from '@apollo/client';

export const TEMP_LOGIN = gql`
   mutation { login(input: { username: "houssem", password: "test" }) {
      access_token,
      user{ username  }
    }
  }
`;
