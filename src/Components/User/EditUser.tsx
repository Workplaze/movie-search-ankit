import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { EDIT_USER } from "../Apollo/mutation/EDIT_USER";

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
  closeModal: () => void;
};

const EditUser: React.FC<EditUserProps> = ({ user, closeModal }) => {
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
      console.log("User data updated:", data);
      closeModal();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  console.log(formData, "formdata");

  return (
    <div className="bg-slate-500">
      <h2>Edit User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label>
          Email id:
          <input
            type="text"
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label>
          Gender :
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label>
          Mobile Number :
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label>
          Mobile Number :
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label>
          DOB :
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="text-black"
          />
        </label>
        <label>
            Address :
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="text-black"
          />
        </label>

        

        

        <button type="submit">Update User</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default EditUser;
