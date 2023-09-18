import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../Apollo/mutation/DELETE_USER";

type DeleteUserProps = {
  userId: string;
  refetchUserData: () => void;
};

const DeleteUser: React.FC<DeleteUserProps> = ({ userId, refetchUserData }) => {
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDeleteUser = async () => {
    try {
      const { data } = await deleteUser({
        variables: { id: userId },
      });
      console.log("User deleted:", data);
      refetchUserData();
    } catch (error) {
      alert(error);
      console.error("Error deleting user:", error);
    }
  };

  return (
    <button onClick={handleDeleteUser} className="text-red-500  hover:bg-red-500 hover:rounded-full hover:p-2 hover:text-yellow-300">
      Delete
    </button>
  );
};

export default DeleteUser;
