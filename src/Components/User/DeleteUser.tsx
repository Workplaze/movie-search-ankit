import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../Apollo/Mutation/Mutation";

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
      alert("User deleted");
      console.log("User deleted:", data);
      refetchUserData();
    } catch (error) {
      alert(error);
      console.error("Error deleting user:", error);
    }
  };

  return (
    <button onClick={handleDeleteUser} className="text-red-500">
      <img
        width="30"
        height="35"
        src="https://img.icons8.com/plasticine/100/filled-trash.png"
        alt="filled-trash"
      />
    </button>
  );
};

export default DeleteUser;
