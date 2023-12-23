import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import CreateStudent from "./CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "./../data/StudentDetails.json";
import EditStudents from "./EditStudents/[id]";

interface SidebarProps {
  isOpen: boolean;
}

const StudentsList: React.FC = () => {
  const students = StudentData;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<any>(null);
  const [, forceRender] = useState({});

  const handleDeleteClick = (student: any) => {
    setStudentToDelete(student);
    console.log("delete clicked", student);
    setDeleteModalOpen(true);
    forceRender({}); // Force re-render
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };
  useEffect(() => {
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);
  useEffect(() => {
    console.log("deleteModalOpen:", deleteModalOpen);
  }, [deleteModalOpen]);

  return (
    <div>
      {deleteModalOpen && studentToDelete && (
        <div className=" flex items-center justify-center z-100">
          <div className="bg-white p-6 rounded-lg md:w-1/3 w-2/3 shadow-lg mt-5">
            <h2 className="text-xl mb-4 font-semibold">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete student {studentToDelete.name}?
            </p>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  // Implement your delete logic here, for now just close the modal
                  setDeleteModalOpen(false);
                }}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => {
                  setDeleteModalOpen(false), console.log("cancel clicked");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedStudent && (
        <div className="md:w-1/6 md:block shadow-lg">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white md:p-8 p-4  rounded-lg md:w-1/2 w-2/3 shadow-md">
              <div className="flex justify-between">
                <h2 className="text-xl ">Student Details</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="hover:bg-gray-200 px-1 py-1 rounded-lg"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <p className="mt-4">Name: {selectedStudent.name}</p>
              <p>Class: {selectedStudent.class}</p>
              <p>Sem: {selectedStudent.sem}</p>
              <p>Room: {selectedStudent.roomno}</p>
              {/* ... other details */}
              <div className="mt-6">
                <Link
                  href={`/EditStudents/${selectedStudent.id}`}
                  className="mr-4 text-blue-500"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteClick(selectedStudent);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={` ${isBlurry ? "blur" : ""}`}>
        <TopBar onSidebarToggle={handleSidebarToggle} />
        <div className="flex">
          <div
            className={`md:block md:w-1/6 bg-white h-screen shadow-lg ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            <Sidebar isOpen={isSidebarOpen} />
          </div>
          <div className="md:block md:w-5/6 bg-gray-100 h-screen w-full ">
            <div className="flex justify-between text-center">
              <h1 className=" mt-6 font-semibold text-3xl flex-1">
                Students List
              </h1>
              <Link
                href="/CreateStudent"
                className={`mt-6 mr-4 px-1 py-1 bg-gray-400 rounded-lg ${
                  isSidebarOpen ? "hidden md:block" : ""
                }`}
              >
                <BsPersonFillAdd size={32} />
              </Link>
            </div>

            <div className="flex bg-gray-100">
              <div className={`m-auto w-full ${isBlurry ? "blur" : ""}`}>
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleStudentClick(student)}
                  >
                    <form>
                      <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                        <div className="px-5 pb-5 w-full">
                          <div className="flex justify-between py-2">
                            <div>{student.name}</div>
                            <div className="flex right-0 w-1/4 justify-between">
                              <div className="hidden md:block">
                                Class:{student.class}
                              </div>
                              <div className="hidden md:block">
                                Sem:{student.sem}
                              </div>
                              <div
                                className={`flex ${
                                  isSidebarOpen ? "hidden md:block" : ""
                                }`}
                              >
                                Room:{student.roomno}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
