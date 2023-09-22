import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($user: user_insert_input!) {
    insert_user(objects: [$user]) {
      returning {
        id
        first_name
        last_name
        address
        dob
        email_id
        gender
        mobile_number
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($userId: uuid, $newData: user_set_input!) {
    update_user(where: { id: { _eq: $userId } }, _set: $newData) {
      affected_rows
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_user(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
