import React from "react";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Toast from "./Toast";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import studentData from "./../data/StudentDetails.json";

const UserHomeComp = () => {
  const student = studentData[0];
  const [isModalOpen, setModalOpen] = useState(false);
  const [showEditToast, setShowEditToast] = useState(false);
  const [isBlurry, setBlurry] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
    ...student, // Ensure it's a string
  });

  const handleSave = () => {
    // Update student data in the JSON file or database
    // For now, just updating the state
    setModalOpen(false);
    setShowEditToast(true);
    setEditedStudent(editedStudent);
  };

  useEffect(() => {
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);

  return (
    <div className="w-full flex justify-center ">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg md:w-1/3 w-full mx-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ">Edit Details</h2>
              <button onClick={() => setModalOpen(false)}>
                <IoClose size={26} className="hover:bg-red-300 rounded-md" />
              </button>
            </div>
            <div className="flex justify-center flex-col p-5  space-y-3 mt-2">
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Students Phone : </p>
                <p className="ml-4">
                  {" "}
                  <input
                    type="text"
                    value={editedStudent.stphn}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        stphn: e.target.value,
                      })
                    }
                  />
                  {/*ignore the error above,the thingy works fine...until it doesnt but anyways,*/}
                </p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Address : </p>
                <p className="ml-4">
                  <input
                    type="text"
                    value={editedStudent.address}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        address: e.target.value,
                      })
                    }
                  />
                </p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Local Guardian : </p>
                <p className="ml-4">
                  <input
                    type="text"
                    value={editedStudent.localg}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        localg: e.target.value,
                      })
                    }
                  />
                </p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Phone : </p>
                <p className="ml-4">
                  <input
                    type="text"
                    value={editedStudent.locphn}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        locphn: e.target.value,
                      })
                    }
                  />
                </p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-400"
            >
              Save
            </button>
          </div>
        </div>
      )}{" "}
      {showEditToast && (
        <>
          <Toast
            message="Details updated successfully."
            type="success"
            onClose={() => setShowEditToast(false)}
          />
        </>
      )}
      <div
        className={`flex flex-col justify-center space-y-10 m-10 w-full  ${
          isBlurry ? "blur" : ""
        }`}
      >
        <div className="font-semibold text-3xl">
          Welcome&nbsp;Back&nbsp;Abcd!
        </div>
        <div className="flex md:flex-row flex-col md:justify-around w-full  md:space-x-10 space-y-10 md:space-y-0 ">
          <div className="w-full md:w-1/2 h-64 md:h-64 bg-gradient-to-b from-blue-600 to-slate-300  rounded-3xl transition-transform duration-300 hover:scale-105">
            <div className="flex justify-between h-full m-2  ">
              <div className="w-1/2  h-full rounded-md flex justify-center items-center  ">
                <img
                  src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"
                  className="h-44 w-40 flex justify-center border border-2 p-2 border-black  rounded-lg shadow-lg"
                ></img>
              </div>
              <div className="w-1/2  h-full rounded-md flex  text-right flex-col space-y-3  p-4">
                <p className="text-7xl font-semibold">{student.roomno}</p>
                <p className="text-3xl">{student.name}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-64 bg-gradient-to-b from-blue-600 to-slate-300 rounded-3xl relative pb-4 pl-4 transition-transform duration-300 hover:scale-105">
            <div className="absolute top-5 right-5">
              <button
                onClick={() => setModalOpen(true)}
                className=" hover:bg-white  text-black p-1  rounded-md"
              >
                {" "}
                <FaEdit size={24} />
              </button>
            </div>
            <div className="flex justify-center flex-col p-5  space-y-3 mt-10">
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Students Phone : </p>
                <p className="ml-4">{student.stphn}</p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Address : </p>
                <p className="ml-4">{student.address}o</p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Local Guardian : </p>
                <p className="ml-4">{student.localg}</p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Phone : </p>
                <p className="ml-4">{student.locphn}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:justify-around w-full  md:space-x-10 space-y-10 md:space-y-0 ">
          <div className="w-full  h-64 md:h-64 bg-gradient-to-b from-blue-600 to-slate-300  rounded-3xl  ">
            <div className="flex md:flex-row flex-col p-6 h-full space-x-8 ">
              <div className="bg-white w-1/3 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 p-6">
                <div className="flex justify-center items-center text-center">
                  <div className="flex flex-col space-y-2 justify-center items-center ">
                    <p className="text-8xl flex justify-center items-center">
                      {student.sem}
                    </p>
                    <p className="text-2xl text-gray-300">Semester</p>
                  </div>
                </div>
              </div>

              <div className="bg-white w-1/3 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 p-6">
                <div className="flex justify-center items-center text-center">
                  <div className="flex flex-col space-y-2 justify-center items-center ">
                    <p className="text-8xl flex justify-center items-center">
                      {student.class}
                    </p>
                    <p className="text-2xl text-gray-300">Class</p>
                  </div>
                </div>
              </div>
              <div className="bg-white w-1/3 rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 p-6">
                <div className="flex justify-center items-center text-center">
                  <div className="flex flex-col space-y-2 justify-center items-center ">
                    <p className="text-8xl flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="w-16 h-16 text-black text-sm bg-transparent border-none rounded-md focus:ring-transparent  accent-black"
                      />{" "}
                    </p>
                    <p className="text-2xl text-gray-300">
                      {" "}
                      <label className="block  text-3xl text-gray-300 ">
                        Fees Paid
                      </label>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomeComp;
