import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import CreateStudent from "./CreateStudent";

interface SidebarProps {
  isOpen: boolean;
}

const StudentsList: React.FC = () => {
  const students = [
    { id: 1, name: "John", class: "CS1", sem: "5", roomno: "101" },
    { id: 2, name: "Doe", class: "ME2", sem: "7", roomno: "102" },
    { id: 3, name: "Mary", class: "EC1", sem: "3", roomno: "102" },
    // ... other students
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };
  return (
    <div>
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
              className={`mt-6 mr-2 px-1 py-1 bg-gray-400 rounded-lg ${
                isSidebarOpen ? "hidden md:block" : ""
              }`}
            >
              <BsPersonFillAdd size={32} />
            </Link>
          </div>
          {isModalOpen && selectedStudent && (
            <div className="md:w-1/6 md:block shadow-lg">
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg w-1/2">
                  <h2 className="text-xl mb-4">Student Details</h2>
                  <p>Name: {selectedStudent.name}</p>
                  <p>Class: {selectedStudent.class}</p>
                  {/* ... other details */}
                  <div className="mt-6">
                    <Link
                      href={`/edit-student/${selectedStudent.id}`}
                      className="mr-4 text-blue-500"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/delete-student/${selectedStudent.id}`}
                      className="text-red-500"
                    >
                      Delete
                    </Link>
                  </div>
                  <button onClick={() => setModalOpen(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
          <div className="flex bg-gray-100">
            <div className="m-auto w-full">
              {students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleStudentClick(student)}
                >
                  <form>
                    <div className="mt-5 bg-white rounded-lg shadow-lg mx-4 text-center items-center">
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
  );
};

export default StudentsList;
