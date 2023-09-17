// CreateUser.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Apollo/mutation/CREATE_USER";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    dob: "",
    email_id: "",
    gender: "",
    mobile_number: 0,
  });

  const [insertUser] = useMutation(CREATE_USER);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const { data } = await insertUser({
        variables: {
          user: formData,
        },
      });
      console.log("User inserted:", data.insert_user.returning[0]);
      setFormData({
        first_name: "",
        last_name: "",
        address: "",
        dob: "",
        email_id: "",
        gender: "",
        mobile_number: 0,
      });
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          placeholder="Date of Birth"
        />
        <input
          type="text"
          name="email_id"
          value={formData.email_id}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          placeholder="Gender"
        />
        <input
          type="number"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleInputChange}
          placeholder="Mobile Number"
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
