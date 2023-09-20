import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const GET_USERDATA = gql`
  query MyQuery {
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

const GET_FILTER_OPTIONS = gql`
  query FilterOptions {
    distinct_roles: user(distinct_on: role) {
      role
    }
  }
`;

const UserData = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRoleFilter, setUserRoleFilter] = useState("");

  const {
    loading: userDataLoading,
    error: userDataError,
    data: userData,
  } = useQuery(GET_USERDATA);

  const {
    loading: filterOptionsLoading,
    error: filterOptionsError,
    data: filterOptionsData,
  } = useQuery(GET_FILTER_OPTIONS);

  if (userDataLoading || filterOptionsLoading) return <p>Loading...</p>;
  if (userDataError || filterOptionsError)
    return (
      <p>Error: {userDataError?.message || filterOptionsError?.message}</p>
    );

  console.log(filterOptionsData, "filerData");

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

  const filterByUserRole = (role: any) => {
    setUserRoleFilter(role);
  };

  const filteredUserData = userData.user.filter((user: any) => {
    if (userRoleFilter && user.role !== userRoleFilter) {
      return false;
    }
    return true;
  });

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
          <div className="fixed inset-10 bg-slate-500 z-50 overflow-x-scroll m-10">
            <div className="bg-white rounded-lg p-2 shadow-lg ">
              <CreateUser close={closeCreateModal} />
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="text-gray-300 font-semibold">
            Filter by UserRole:
          </label>
          <select
            className="p-2 border rounded-md"
            onChange={(e) => filterByUserRole(e.target.value)}
            value={userRoleFilter}
          >
            <option value="">All</option>
            {filterOptionsData.distinct_roles.map(
              (roleOption: any, index: number) => (
                <option key={index} value={roleOption.role}>
                  {roleOption.role}
                </option>
              )
            )}
          </select>
        </div>

        <ul className="mt-8">
          {filteredUserData.map((userData: any) => (
            <li
              key={userData.id}
              className="bg-gray-100 p-4 my-4 rounded-lg shadow-lg sm:flex sm:flex-row"
            >
              <div>
                <p className="text-lg inline p-2 m-2 text-gray-800">
                  <span className="font-bold">First Name:</span>{" "}
                  {userData.first_name}
                </p>
              </div>
              <div>
                <p className="text-lg inline p-2 m-2 text-gray-800">
                  <span className="font-bold">Last Name:</span>{" "}
                  {userData.last_name}
                </p>
              </div>
              <div>
                <p className="text-lg inline p-2 m-2 text-gray-800">
                  <span className="font-bold">Email:</span> {userData.email_id}
                </p>
              </div>
              <div>
                <p className="text-lg inline p-2 m-2 text-gray-800">
                  <span className="font-bold">Gender:</span> {userData.gender}
                </p>
              </div>
              <div className="flex ">
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
          <div className="fixed inset-10 bg-slate-500 z-50 overflow-x-scroll m-10">
            <div className="bg-white rounded-lg p-2 shadow-lg ">
              <EditUser user={selectedUser} closeModal={closeEditModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
