import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { loading, error, data } = useQuery(GET_USERDATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-10 m-5">
      <div className="mt-8">
        <h2 className="font-extrabold text-2xl text-gray-800 text-center bg-blue-300 p-4">
          User Information
        </h2>

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={openCreateModal}
          >
            Create User
          </button>
        </div>

        {isCreateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute  bg-gray-900"></div>
            <div className="bg-slate-400 rounded-lg p-8 shadow-lg z-50">
              <span
                className="absolute top-20 right-10 text-3xl m-2 text-gray-200 rounded p-2 on hover:bg-red-400 bg-black cursor-pointer"
                onClick={closeCreateModal}
              >
                &times;
              </span>
              <CreateUser />
            </div>
          </div>
        )}

        <ul className="mt-8">
          {data.user.map((userData: any) => (
            <li
              key={userData.id}
              className="bg-gray-100 p-4 my-4 rounded-lg shadow-lg"
            >
              <p className="text-lg inline p-2 m-2 text-gray-800">
                <span className="font-bold">First Name:</span>{" "}
                {userData.first_name}
              </p>
              <p className="text-lg inline p-2 m-2 text-gray-800">
                <span className="font-bold">Last Name:</span>{" "}
                {userData.last_name}
              </p>
              <p className="text-lg inline p-2 m-2 text-gray-800">
                <span className="font-bold">Email:</span> {userData.email_id}
              </p>
              <p className="text-lg inline p-2 m-2 text-gray-800">
                <span className="font-bold">Gender:</span> {userData.gender}
              </p>
              <div className="flex mt-4">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full mr-4"
                  onClick={() => openEditModal(userData)}
                >
                  Edit
                </button>
                <DeleteUser userId={userData.id} refetchUserData={() => {}} />
              </div>
            </li>
          ))}
        </ul>

        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg z-50 ">
              <EditUser user={selectedUser} closeModal={closeEditModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
