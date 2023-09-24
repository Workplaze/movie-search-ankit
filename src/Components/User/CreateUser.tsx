// CreateUser.js
import React, { useContext, useState } from "react";
import "tailwindcss/tailwind.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Apollo/Mutation/Mutation";
import { ThemeContext } from "../ContextApi/ThemeContext";

const CreateUser = () => {
  const { darkMode } = useContext(ThemeContext);
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await insertUser({
        variables: {
          user: formData,
        },
      });
      console.log("User inserted:", data.insert_user);

      alert("New User Added");
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
      alert(error);
    }
  };

  return (
    <form
      className={` p-5 flex flex-col  ${
        darkMode ? "bg-white text-black" : "bg-slate-600 text-white"
      } rounded-md shadow-sm shadow-yellow-200 `}
      onSubmit={handleSubmit}
    >
      <div className="pt-10 h-full flex justify-between">
        <h2 className="text-lg">Create User</h2>
      </div>

      <li className="flex flex-col justify-between">
        <div className="flex flex-col justify-between">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="text-black m-2 p-2 border border-black"
          />
        </div>
      </li>
      <li className="flex flex-col justify-between">
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between">
        <label>Email id:</label>
        <input
          type="text"
          name="email_id"
          value={formData.email_id}
          onChange={handleInputChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between">
        <label>Gender :</label>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>

      <li className="flex flex-col justify-between">
        <label>Mobile Number :</label>
        <input
          type="number"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleInputChange}
          maxLength={10}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between">
        <label>DOB :</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <li className="flex flex-col justify-between">
        <label>Address :</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="text-black m-2 p-2 border border-black"
        />
      </li>
      <button className="flex justify-center items-center" type="submit">
        <div className=" w-fit border rounded-full p-2 m-4 bg-slate-300 text-black shadow-md shadow-black hover:shadow-orange-700">
          Create User
        </div>
      </button>
    </form>
  );
};

export default CreateUser;
