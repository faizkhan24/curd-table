import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { MdSystemUpdateAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Update = ({ showModal, setShowModal }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://6633b93ff7d50bbd9b4a7818.mockapi.io/crud-table/${id}`, {
        name: name,
        email: email,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  const modalRef = useRef();
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
    >
      <div className="flex flex-col  gap-5 text-white">
        <button
          onClick={() => {
            setShowModal(false);
          }}
          className="place-self-end mr-5"
        >
          <ImCross size={30} />
        </button>
        <div
          className=" dark bg-white border border-gray-500 rounded-xl px-20 py-10 flex flex-col gap-5  items-center mx-4 shadow-xl"
          data-aos="zoom-in"
        >
          {/* <h1 className="text-2xl  font-bold place-self-start ">Update</h1> */}
          <form>
            <label className="text-lg font-bold "> Name</label>
            <input
              value={name}
              type="text"
              className=" input text-white bg-white border border-gray-200 text-black w-full my-3 rounded-md  px-3 h-12"
              placeholder="Enter your Name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <label className="text-lg font-bold ">Email</label>
            <input
              value={email}
              type="email"
              className=" input text-white  bg-white border border-gray-200 text-black w-full h-12 rounded-md px-3 my-3"
              placeholder="Enter your Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <div className="submit-btn w-28 text-white  rounded-md my-5 h-12   ">
              <button
                type="submit"
                onClick={handleUpdate}
                className="flex items-center py-2 font-bold text-lg"
              >
                <MdSystemUpdateAlt className="text-xl mx-2" />
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
