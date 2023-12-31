import {
  GET_FILTER_OPTIONS,
  GET_FITERED_USERDATA,
  GET_USERDATA,
} from "../Apollo/Query/Queries";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import { useQuery } from "@apollo/client";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import React, { useContext, useState } from "react";
import { SET_USER_ROLE_FILTER, ThemeContext } from "../ContextApi/ThemeContext";

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
  } = useQuery(GET_USERDATA);

  const {
    loading: userFilteredDataLoading,
    error: userFilteredDataError,
    data: userFilteredData,
  } = useQuery(GET_FITERED_USERDATA, {
    variables: { role: userRoleFilter },
  });

  if (userDataLoading || filterOptionsLoading || userFilteredDataLoading)
    return <p>Loading...</p>;

  if (userDataError || filterOptionsError || userFilteredDataLoading) {
    return (
      <p>
        Error:
        {userDataError?.message ||
          filterOptionsError?.message ||
          userFilteredDataError?.message}
      </p>
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

  const filteredUserArray =
    userRoleFilter !== "" ? userFilteredData?.user || [] : userArray;

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
          <div>
            <Modal open={isCreateModalOpen} onClose={closeCreateModal} center>
              <CreateUser close={closeCreateModal} />
            </Modal>
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
            <option value="">All</option>
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
          {filteredUserArray.map((userData: any) => (
            <li
              key={userData.id}
              className="bg-gray-100 p-2 my-2 rounded-lg shadow-lg justify-between sm:flex sm:flex-row"
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
              <div className="justify-ends m-2 items-end ">
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
        <div className="bg-black"></div>
        {isEditModalOpen && selectedUser && (
          <div>
            <Modal open={isEditModalOpen} onClose={closeEditModal} center>
              <EditUser user={selectedUser} Close={closeEditModal} />
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
