import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser"; // Import the EditUser component
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Add state for Edit User modal
  const [selectedUser, setSelectedUser] = useState(null); // Store the selected user for editing

  const { loading, error, data } = useQuery(GET_USERDATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openEditModal = (user:any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-10 m-5">
      <div className="mt-5">
        <h2 className="font-extrabold text-2xl text-sky-300">
          User Information
        </h2>

        <div className="border content-around w-32 bg-gray-700 text-center shadow-md shadow-stone-400-">
          <button onClick={openCreateModal}>Create User</button>
        </div>

        {isCreateModalOpen && (
          <div
            style={{ backgroundColor: "gray", margin: "10px", padding: "20px" }}
          >
            <div className="justify-center items-center flex">
              <span
                className="border bg-red-500"
                onClick={closeCreateModal}
              >
                &times;
              </span>

              <CreateUser />
            </div>
          </div>
        )}

        <ul>
          {data.user.map((userData:any) => (
            <li key={userData.id} className="m-5 bg-gray-800  sm:rounded-full">
              <p className="m-5 inline-block">
                <h1 className="text-sm text-orange-600"> First Name:</h1>{" "}
                {userData.first_name}
              </p>
              <p className="m-5 inline-block">
                <h1 className="text-sm text-orange-600">Last Name:</h1>{" "}
                {userData.last_name}
              </p>
              <p className="m-5 inline-block">
                <h1 className="text-sm text-orange-600">Email:</h1>{" "}
                {userData.email_id}
              </p>
              <p className="m-5 inline-block">
                <h1 className="text-sm text-orange-600">Gender:</h1>{" "}
                {userData.gender}
              </p>
              <button onClick={() => openEditModal(userData)}>Edit</button>
              <DeleteUser userId={userData.id} refetchUserData={() => {}} />
            </li>
          ))}
        </ul>

        {isEditModalOpen && selectedUser && (
          <div className="bg-gray-200 p-4">
            <EditUser
              user={selectedUser}
              closeModal={closeEditModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
