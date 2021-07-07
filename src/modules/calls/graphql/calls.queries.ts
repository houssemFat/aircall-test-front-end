import { gql } from '@apollo/client';

export const PAGINATED_CALLS_QUERY = gql`
   query paginatedCallsQuery($offset: Float!, $limit: Float!){
      paginatedCalls(offset: $offset, limit : $limit) {
        nodes {
          id,
          from,
          to,
          created_at,
          is_archived,
          duration,
          direction,
          call_type,
          notes{id}
        }
        totalCount
        hasNextPage
      }
  }
`;

export const CALL_QUERY = gql`
   query callWrapper($id: ID!) {
      call(id: $id) {
          id,
    from, 
    to,
          via,
           created_at,
          is_archived,
          duration,
          direction,
          call_type,
          notes {id, content}
  }
}
`;
