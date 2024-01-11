import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import CreateStudent from "./CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "../data/StudentDetails.json";
import EditStudents from "./EditStudents/[id]";
import StudentsListComp from "@/components/StudentsListComp";
import "./../app/globals.css";
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
      {/*<div className={` ${isBlurry ? "blur" : ""}`}>*/}
      <div className={` ${isModalOpen ? "blur" : ""}`}>
        <TopBar onSidebarToggle={handleSidebarToggle} />
        <div className="flex">
          <div
            className={`md:block md:w-1/6 bg-white h-screen  ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            <Sidebar isOpen={isSidebarOpen} />
          </div>
          <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full  ">
            <div
              className={`flex justify-between text-center ${
                isModalOpen ? "blur" : ""
              }`}
            >
              <h1
                className={`mt-6 font-semibold text-3xl flex-1 ${
                  isModalOpen ? "blur" : ""
                }`}
              >
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
            <StudentsListComp />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentsList;
