import React, { useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";
import AOS from "aos";
import "aos/dist/aos.css";
const Delete = ({
  showDeleteModal,
  setShowDeleteModal,
  itemId,
  handleDelete,
}) => {
  const modalRef = useRef();

  const confirmDelete = () => {
    handleDelete(itemId);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowDeleteModal(false);
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
    >
      <div className="flex flex-col gap-5 text-white  ">
        <button
          className="place-self-end mr-5"
          onClick={() => {
            setShowDeleteModal(false);
          }}
        >
          <ImCross size={30} />
        </button>
        <div
          className="dark bg-white border border-gray-500 rounded-xl px-10  py-10 flex flex-col gap-5  items-center mx-4 shadow-xl"
          data-aos="fade-up"
        >
          <h1 className=" dark place-self-start font-bold text-blue-900  text-lg">
            Delete Employee
          </h1>
          <p>Are you sure you want to delete these Records?</p>
          <div className="flex gap-5">
            <button
              className=" cancel-btn bg-gray-200 border border-gray-500 rounded-md  font-semibold  w-24 h-10"
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-red-700 text-white border border-gray-500 rounded-md font-semibold w-24 h-10"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
