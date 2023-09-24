import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { SET_USER_ROLE_FILTER, ThemeContext } from "../ContextApi/ThemeContext";
import { GET_FILTER_OPTIONS, GET_USERDATA } from "../Apollo/Query/Queries";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

const UserData = () => {
  const { darkMode, state, dispatch } = useContext(ThemeContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const userRoleFilter = state.userRoleFilter;

  const {
    loading: filterOptionsLoading,
    error: filterOptionsError,
    data: filterOptionsData,
  } = useQuery(GET_FILTER_OPTIONS);

  const {
    loading: userDataLoading,
    error: userDataError,
    data: userData,
    refetch,
  } = useQuery(GET_USERDATA, {
    variables: { role: userRoleFilter },
  });

  if (userDataLoading || filterOptionsLoading) return <p>Loading...</p>;

  if (userDataError || filterOptionsError) {
    return (
      <p>Error: {userDataError?.message || filterOptionsError?.message}</p>
    );
  }

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    refetch();
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
    refetch();
  };

  const filterByUserRole = (role: String) => {
    dispatch({ type: SET_USER_ROLE_FILTER, payload: role });
  };

  const userArray = userData?.user || [];

  return (
    <div className="p-4 mt-20">
      <div className="mt-8">
        <h2 className="font-extrabold text-2xl text-gray-800 text-center bg-blue-300 p-2">
          User Information
        </h2>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full"
            onClick={openCreateModal}
          >
            Create User
          </button>
        </div>

        {isCreateModalOpen && (
          <div className="fixed inset-2 flex items-center justify-center p-2  bg-black bg-opacity-50 overflow-auto z-50">
            <CreateUser close={closeCreateModal} />
          </div>
        )}

        <div className="mt-4">
          <label
            className={
              darkMode
                ? "text-dark p-2  font-semibold"
                : "text-yellow-50 p-2  font-semibold"
            }
          >
            Filter by UserRole:
          </label>
          <select
            className="text-black p-2 border rounded-md"
            onChange={(e) => filterByUserRole(e.target.value)}
            value={userRoleFilter}
          >
            {filterOptionsData.distinct_roles.map(
              (roleOption: any, index: string) => (
                <option
                  key={index}
                  className="text-black"
                  value={roleOption.role}
                >
                  {roleOption.role}
                </option>
              )
            )}
          </select>
        </div>

        <ul className="mt-8">
          {userArray.map((userData: any) => (
            <li
              key={userData.id}
              className="bg-gray-100 p-4 my-4 rounded-lg shadow-lg justify-around sm:flex sm:flex-row"
            >
              <div className="sm:flex">
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
                    <span className="font-bold">Email:</span>{" "}
                    {userData.email_id}
                  </p>
                </div>
                <div>
                  <p className="text-lg inline p-2 m-2 text-gray-800">
                    <span className="font-bold">Gender:</span> {userData.gender}
                  </p>
                </div>
              </div>
              <div className="justify-ends items-end ">
                <button
                  className="bg-slate-800 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-full mr-2"
                  onClick={() => openEditModal(userData)}
                >
                  <img
                    width="30"
                    height="35"
                    src="https://img.icons8.com/plasticine/100/create-new.png"
                    alt="create-new"
                  />
                </button>
                <DeleteUser userId={userData.id} refetchUserData={refetch} />
              </div>
            </li>
          ))}
        </ul>

        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-2 flex items-center justify-center p-2  bg-black bg-opacity-50 overflow-auto z-50">
            <EditUser user={selectedUser} closeModal={closeEditModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
