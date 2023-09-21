import { gql } from "@apollo/client";

export const EDIT_USER = gql`
  mutation EditUser($userId: uuid, $newData: user_set_input!) {
    update_user(where: { id: { _eq: $userId } }, _set: $newData) {
      affected_rows
    }
  }
`;
