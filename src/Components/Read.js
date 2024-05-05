import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { MdOutlineCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Update from "./Update";
import { CiFilter } from "react-icons/ci";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Delete from "./Delete";

const Read = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
    const filtered = data.filter((row) => {
      return row.name.toLowerCase().includes(value);
    });
    setFilteredData(filtered);
  };

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setFilteredData(sortedData);
  };

  function getData() {
    axios
      .get("https://6633b93ff7d50bbd9b4a7818.mockapi.io/crud-table")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        setLoading(false);
      });
  }

  const handleDelete = (id) => {
    axios
      .delete(`https://6633b93ff7d50bbd9b4a7818.mockapi.io/crud-table/${id}`)
      .then(() => {
        getData();
        setShowDeleteModal(false);
      });
  };

  const openDeleteModal = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-left mx-auto w-screen h-screen">
        <div className="  dark  w-auto md:w-2/3 md:h-auto mx-auto rounded-xl border border-gray-200 shadow-xl">
          <div className="flex justify-between items-center ">
            <div className="bg-blue-600 w-24 md:w-28  mx-5 flex  rounded-md my-5 md:h-12 text-white hover:bg-blue-700 ">
              <Link to={"/"}>
                <button className="flex items-center   py-2 font-bold  md:text-lg">
                  <MdOutlineCreate className="md:text-2xl mx-2" />
                  Create
                </button>
              </Link>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={filterValue}
                onChange={handleFilter}
                className=" input w-36 md:mx-5 mr-10 rounded-lg h-10 px-3 border border-gray-200"
              ></input>
              <button
                onClick={handleSort}
                className="bg-green-600 rounded-md text-2xl font-bold text-white py-2 px-7 mr-3 md:mx-5"
              >
                <CiFilter />
              </button>
            </div>
          </div>

          <table className="table  ">
            <thead className=" table-head bg-gray-100 rounded-lg">
              <tr>
                <th className="w-80 h-20 text-lg" scope="col border">
                  #
                </th>
                <th
                  className="w-80 md:text-left text-center text-lg"
                  scope="col"
                >
                  Name
                </th>
                <th
                  className="w-80 md:text-left text-center text-lg"
                  scope="col"
                >
                  Email
                </th>
                <th className="w-80" scope="col"></th>
                <th className="w-80" scope="col"></th>
              </tr>
            </thead>
            {filteredData.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No data found.
                  </td>
                </tr>
              </tbody>
            ) : (
              filteredData.slice((page - 1) * 7, page * 7).map((eachData) => {
                return (
                  <tbody key={eachData.id}>
                    <tr>
                      <th className="text-purple-500 py-5" scope="row">
                        {eachData.id}
                      </th>
                      <td>{eachData.name}</td>
                      <td>{eachData.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setToLocalStorage(
                              eachData.id,
                              eachData.name,
                              eachData.email
                            );
                          }}
                        >
                          <MdEdit className="text-2xl text-orange-400  md:mx-14" />
                        </button>
                      </td>
                      <td>
                        <button>
                          <MdDelete
                            onClick={() => openDeleteModal(eachData.id)}
                            className="text-2xl text-red-500 "
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </table>
        </div>
        {showModal && (
          <Update showModal={showModal} setShowModal={setShowModal} />
        )}

        {showDeleteModal && (
          <Delete
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            itemId={itemToDelete}
            handleDelete={handleDelete}
          />
        )}

        {filteredData.length > 0 && (
          <div className="p-10 m-10 flex justify-center">
            <span onClick={() => selectPageHandler(page - 1)}>
              <GrCaretPrevious
                className={page > 1 ? "my-4 cursor-pointer" : "hidden"}
              />
            </span>

            {[...Array(Math.ceil(filteredData.length / 5))].map((_, i) => {
              return (
                <span
                  onClick={() => selectPageHandler(i + 1)}
                  className={
                    page === i + 1
                      ? "px-6 py-2 bg-white border-4 text-center border-blue-600  text-black font-bold rounded-md mx-3 cursor-pointer "
                      : " px-6 py-2 bg-blue-600 text-center text-white font-bold rounded-md mx-3 cursor-pointer hover:bg-blue-700 "
                  }
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}

            <span onClick={() => selectPageHandler(page + 1)}>
              <GrCaretNext
                className={
                  page < filteredData.length / 5
                    ? "my-4 cursor-pointer"
                    : "hidden"
                }
              />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Read;
