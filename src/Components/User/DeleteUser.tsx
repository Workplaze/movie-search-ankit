import React from "react";
import { useMutation, gql } from "@apollo/client";
import { DELETE_USER } from "../Apollo/mutation/DELETE_USER";

type DeleteUserProps = {
  userId: string;
  refetchUserData: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({
  userId,
  refetchUserData,
}) => {
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDeleteUser = async () => {
    try {
      const { data } = await deleteUser({
        variables: { id: userId },
      });
      console.log("User deleted:", data);
      refetchUserData();
    } catch (error) {
        alert(error)
      console.error("Error deleting user:", error);
    }
  };

  return (
    <button onClick={handleDeleteUser} className="text-red-500">
      Delete
    </button>
  );
};

export default DeleteUser;