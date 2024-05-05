import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./DarkMode.css";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const header = { "Access-Control-Allow-Origin ": "*" };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (name && email) {
      axios
        .post("https://6633b93ff7d50bbd9b4a7818.mockapi.io/crud-table", {
          name: name,
          email: email,
          header,
        })
        .then(() => {
          navigate("/read");
        });
    } else {
      // Show a toast notification
      toast.error("Please fill in both name and email fields.");
    }
  };

  return (
    <>
      <div className="  flex  flex-col justify-center items-center h-screen w-screen mb-20  ">
        <div className=" dark border border-gray-400 rounded-lg mx-5 shadow-lg md:w-1/2 h-auto">
          <div className="flex items-center justify-between mx-10">
            <h2 className="font-bold text-5xl my-10 md:mx-5">Create</h2>
            <Link to={"/read"}>
              <button className=" show-data bg-blue-600 place-self-end font-bold rounded-md text-white md:text-lg text-sm  w-20 h-10 md:w-28 md:h-12 hover:bg-blue-700">
                Show Data
              </button>
            </Link>
          </div>

          <form>
            <div className=" mx-20 py-5 my-3">
              <label className="text-lg font-bold">Name</label>
              <input
                value={name}
                type="text"
                required
                className=" input w-full h-12 border border-gray-400 rounded-md px-5"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className=" mx-20 py-5">
              <label className="text-lg font-bold leading-36">
                Email Address
              </label>
              <input
                value={email}
                required
                type="email"
                className="  input w-full h-12 border border-gray-400 rounded-md px-5"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className=" submit-btn bg-blue-600 font-bold rounded-md text-white my-10 mx-20  w-28 h-12 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
