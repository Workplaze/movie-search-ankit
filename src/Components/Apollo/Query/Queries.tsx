import { gql } from "@apollo/client";

export const GET_FITERED_USERDATA = gql`
  query GetFilteredUserdata($role: String!) {
    user(where: { role: { _eq: $role } }) {
      id
      address
      dob
      email_id
      first_name
      gender
      last_name
      mobile_number
      role
      status
    }
  }
`;

export const GET_USERDATA = gql`
  query GetUserData {
    user {
      id
      address
      dob
      email_id
      first_name
      gender
      last_name
      mobile_number
      role
      status
    }
  }
`;

export const GET_FILTER_OPTIONS = gql`
  query FilterOptions {
    distinct_roles: user(distinct_on: role) {
      role
    }
  }
`;
