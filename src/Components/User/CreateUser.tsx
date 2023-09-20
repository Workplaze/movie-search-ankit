// CreateUser.js
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Apollo/mutation/CREATE_USER";

type CreateUserProps = {
  close: () => void;
};

const CreateUser: React.FC<CreateUserProps> = ({ close }) => {
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
      close();
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
    <div className="bg-slate-500 overflow-auto p-4 h-auto mt-10 w-72">
      <div className="flex items-end justify-between p-4">
        <h2 className="">Create User</h2>
        <div className="">
          <button
            className="bg-red-400 p-1 hover:bg-red-700 rounded-full"
            onClick={close}
          >
            X
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
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
        <div className="flex justify-center items-center border rounded-full p-2 m-4 bg-slate-300 text-black shadow-md shadow-black hover:shadow-orange-700">
          <button type="submit">Create User</button>
        </div>
      </form>
    </div>

    // <div className="bg-slate-500 overflow-auto">
    //   <div className="flex flex-col m-1 p-2 ">
    //     <h2 className="">Create User</h2>
    //     <form onSubmit={handleSubmit} className="flex flex-col ">
    //       <input
    //         type="text"
    //         name="first_name"
    //         value={formData.first_name}
    //         onChange={handleInputChange}
    //         placeholder="First Name"
    //         className="p-2 border border-black m-4 text-black"
    //       />
    //       <input
    //         type="text"
    //         name="last_name"
    //         value={formData.last_name}
    //         onChange={handleInputChange}
    //         placeholder="Last Name"
    //         className="p-2 border border-black m-4 text-black"
    //       />
    //       <input
    //         type="text"
    //         name="address"
    //         value={formData.address}
    //         onChange={handleInputChange}
    //         placeholder="Address"
    //         className="p-2 border border-black m-4 text-black"
    //       />
    //       <input
    //         type="text"
    //         name="dob"
    //         value={formData.dob}
    //         onChange={handleInputChange}
    //         placeholder="Date of Birth"
    //         className="p-2 border border-black m-4 text-black"
    //       />
    //       <input
    //         type="text"
    //         name="email_id"
    //         value={formData.email_id}
    //         onChange={handleInputChange}
    //         placeholder="Email"
    //         className="p-2 border border-black m-4 text-black"
    //       />
    //       <input
    //         type="text"
    //         name="gender"
    //         value={formData.gender}
    //         onChange={handleInputChange}
    //         placeholder="Gender"
    //         className="p-2 border border-black m-4 text-black"
    //       />
    //       <input
    //         type="number"
    //         name="mobile_number"
    //         value={formData.mobile_number}
    //         onChange={handleInputChange}
    //         placeholder="Mobile Number"
    //         className="p-2 border border-black m-4 placeholder-gra text-black"
    //       />
    //       <button className="border p-2 shadow-md shadow-black " type="submit">
    //         Create User
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CreateUser;
