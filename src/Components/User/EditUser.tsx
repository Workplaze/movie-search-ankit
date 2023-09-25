import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { EDIT_USER } from "../Apollo/Mutation/Mutation";
import { ThemeContext } from "../ContextApi/ThemeContext";

type EditUserProps = {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email_id: string;
    gender: string;
    mobile_number: number;
    dob: number;
    address: string;
  };
  Close: () => void;
};

const EditUser: React.FC<EditUserProps> = ({ user, Close }) => {
  const { darkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email_id: user.email_id || "",
    gender: user.gender || "",
    mobile_number: user.mobile_number || "",
    dob: user.dob || "",
    address: user.address || "",
  });

  const [updateUser] = useMutation(EDIT_USER);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          userId: user.id,
          newData: formData,
        },
      });
      alert("User detail Updated");
      Close();
      console.log("User data updated:", data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <form
      className={` flex flex-col  ${
        darkMode ? "bg-white text-black" : "bg-slate-600 text-white"
      } rounded-md shadow-sm shadow-yellow-200 `}
      onSubmit={handleSubmit}
    >
      <div className="pt-2 flex justify-between">
        <h2 className="text-lg">Edit User</h2>
      </div>

      <li className="flex flex-col justify-between p-2">
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between p-2">
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between p-2">
        <label>Email id:</label>
        <input
          type="text"
          name="email_id"
          value={formData.email_id}
          onChange={handleChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between p-2">
        <label>Gender :</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between p-2">
        <label>Mobile Number :</label>
        <input
          type="text"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between p-2">
        <label>Mobile Number :</label>
        <input
          type="text"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between p-2">
        <label>DOB :</label>
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between p-2">
        <label>Address :</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="text-black  m-2 p-2 border border-black"
        />
      </li>
      <button type="submit">
        <div className="flex justify-center items-center border rounded-full p-2 m-4 bg-slate-300 text-black shadow-md shadow-black hover:shadow-orange-700">
          Update User
        </div>
      </button>
    </form>
  );
};

export default EditUser;
