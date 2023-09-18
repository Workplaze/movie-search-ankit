import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation InsertUser($user: user_insert_input!) {
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
