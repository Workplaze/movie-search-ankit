import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_user(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;