import { gql } from '@apollo/client';

export const ARCHIVE_CALL_MUTATION = gql`
mutation archiveCallWrapper($id: ID!) {
  archiveCall(id: $id){
    is_archived
  }
}
`;
export const ADD_NOTE_MUTATION = gql`
mutation AddNoteWrapper($id: ID!, $content: String!) {
    addNote(input: {
      activityId : $id,
      content : $content
    }){
    id
  }
}
`;
