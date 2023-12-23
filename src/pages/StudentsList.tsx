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
interface Student {
  id: number;
  name: string;
  class: string;
  sem: string;
  roomno: string;
  email: string;
  fees: string;
  password: string;
}

const StudentsList: React.FC = () => {
  const students = StudentData;
  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false); //to check whether the student details modal is open
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open
  const [studentsList, setStudentsList] = useState<Student[]>(StudentData); //to map student list

  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };

  const handleStudentClick = (student: any) => {
    //to select particular student to show details of in student details modal
    setSelectedStudent(student);
    setModalOpen(true);
  };

  useEffect(() => {
    //to set background to blur when modal is open
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);

  const deleteStudent = (id: number) => {
    //to map the deleted students
    const updatedList = studentsList.filter((student) => student.id !== id);
    setStudentsList(updatedList);
  };

  return (
    <div>
      {isModalOpen && selectedStudent && (
        //modal for student details
        <div className="md:w-1/6 md:block shadow-lg">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white md:p-8 p-4  rounded-lg md:w-1/2 w-2/3 shadow-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Student Details</h2>
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
                  className="mr-4 text-white py-2 px-2 bg-blue-500 rounded-md hover:bg-blue-400"
                >
                  Edit
                </Link>
                <button
                  className="text-white py-2 px-2 bg-red-500 rounded-md hover:bg-red-400"
                  onClick={(e) => {
                    console.log("delete clicked");
                    deleteStudent(selectedStudent.id);
                    setModalOpen(false);
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
                {studentsList.map((student) => (
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
