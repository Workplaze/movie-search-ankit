import React, { useContext, useState, useReducer, useEffect } from "react";
import { useQuery } from "@apollo/client";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import { ThemeContext } from "../ContextApi/ThemeContext";
import { GET_FILTER_OPTIONS, GET_USERDATA } from "../Apollo/Query/Queries";
import { userReducer, SET_USER_ROLE_FILTER } from "../UseReducer/UserReducer";

const UserData = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  const [state, dispatch] = useReducer(userReducer, {
    userRoleFilter: localStorage.getItem("userRoleFilter") || "",
  });

  const userRoleFilter = state.userRoleFilter;

  useEffect(() => {
    localStorage.setItem("userRoleFilter", userRoleFilter);
  }, [userRoleFilter]);

  console.log(state, "state");

  const {
    loading: filterOptionsLoading,
    error: filterOptionsError,
    data: filterOptionsData,
  } = useQuery(GET_FILTER_OPTIONS);

  const {
    loading: userDataLoading,
    error: userDataError,
    data: userData,
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
    dispatch({ type: SET_USER_ROLE_FILTER, payload: role });
  };

  const userArray = userData?.user || [];

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
          <div className="fixed inset-10 z-50 overflow-x-auto m-10">
            <div
              className={
                darkMode
                  ? "bg-slate-400 rounded-lg p-2 shadow-lg "
                  : "bg-gray-700 rounded-lg p-2 shadow-lg "
              }
            >
              <CreateUser close={closeCreateModal} />
            </div>
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
            <option className="text-black" value="">
              all
            </option>
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
          <div className="fixed inset-10 bg-slate-500 z-50 overflow-auto m-10">
            <div
              className={
                darkMode
                  ? "bg-slate-400 rounded-lg p-2 shadow-lg "
                  : "bg-gray-700 rounded-lg p-2 shadow-lg "
              }
            >
              <EditUser user={selectedUser} closeModal={closeEditModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
