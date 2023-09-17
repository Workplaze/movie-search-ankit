import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_USERDATA = gql`
  query MyQuery {
    user {
      id
      first_name
      last_name
    }
  }
`;

const UserData = () => {
  const { loading, error, data } = useQuery(GET_USERDATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      {data.user.map((userData: any) => (
        <div key={userData.id}>
          <li>{userData.first_name}</li>
        </div>
      ))}
    </div>
  );
};

export default UserData;
