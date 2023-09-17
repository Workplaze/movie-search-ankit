import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateUser from "./CreateUser";
import "tailwindcss/tailwind.css";
import DeleteUser from "./DeleteUser";

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

  return (
    <div className="p-10 m-5">
      <div className="mt-5">
        <h2 className="font-extrabold text-2xl text-sky-300">
          User Information
        </h2>

        <div className="border content-around w-32">
          <button onClick={() => setIsModalOpen(true)}>Create User</button>
        </div>

        {isModalOpen && (
          <div
            className="modal"
            style={{ backgroundColor: "gray", margin: "10px", padding: "20px" }}
          >
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
            <li key={userData.id} style={{ background: "to-yellow-900" }}>
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
              <DeleteUser userId={userData.id} refetchUserData={() => {}} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserData;
