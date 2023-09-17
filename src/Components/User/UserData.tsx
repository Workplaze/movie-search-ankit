import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateUser from "./CreateUser";
import "tailwindcss/tailwind.css";

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
  console.log(data);

  return (
    <div className="p-10 m-5">
      <div className="mt-5 ">
        <h2 className="font-extrabold text-2xl text-sky-300">
          User Information
        </h2>

        <div className="border content-around w-32 text-center bg-slate-900 m-3">
          <button onClick={() => setIsModalOpen(true)}>Create User</button>
        </div>

        {isModalOpen && (
          <div
            className="modal"
            style={{ backgroundColor: "gray", margin: "10px", padding: "20px" }}
          >
            <div className="modal-content">
              <span className="border" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <CreateUser />
            </div>
          </div>
        )}

        <ul>
          {data.user.map((userData: any) => (
            <li key={userData.id} className="bg-blue-900 m-5">
              <p className="inline-block m-2">
                <p className="text-gray-500">First Name:</p> {userData.first_name}
              </p>
              <p className="inline-block m-2">
              <p className="text-gray-500">Last Name:</p> {userData.last_name}
              </p>
              <p className="inline-block m-2">
              <p className="text-gray-500">Email:</p> {userData.email_id}
              </p>
              <p className="inline-block m-2">
              <p className="text-gray-500"> Gender:</p> {userData.gender}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserData;
