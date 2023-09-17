import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateUser from "./CreateUser";

const GET_USERDATA = gql`
  query MyQuery {
    user {
      dob
      email_id
      address
      first_name
      gender
      id
      last_name
      mobile_number
    }
  }
`;

const UserData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_USERDATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)

  return (
    <div style={{ padding: "15px", paddingTop: "80px", backgroundColor:"bg-gray-500" }}>
      <div className="bg-black mt-20">
        <h2>User Information</h2>

        
        <button onClick={() => setIsModalOpen(true)}>Create User</button>

        {isModalOpen && (
          <div className="modal" style={{backgroundColor: "gray",margin:"10px",padding:"20px"}}>
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <CreateUser />
            </div>
          </div>
        )}

        <ul>
          {data.user.map((userData: any) => (
            <li key={userData.id} style={{background:"to-yellow-900"}}>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                First Name: {userData.first_name}
              </p>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                Last Name: {userData.last_name}
              </p>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                Email: {userData.email_id}
              </p>
              <p style={{ display: "inline-block", marginRight: "10px" }}>
                Gender: {userData.gender}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserData;
