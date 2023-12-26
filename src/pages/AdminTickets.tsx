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
import { MdEditNotifications } from "react-icons/md";
import NotifData from "../data/Notifications.json";
import CreateNotifications from "./CreateNotifications";
import { FaEdit } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

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

const AdminTicket: React.FC = () => {
  const students = StudentData;

  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check whether sidebar is open in responsive view

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentsList, setStudentsList] = useState<Student[]>(StudentData); //to map student list

  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State variable for dropdown visibility

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div>
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
          <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full ">
            <div className="flex justify-between text-center">
              <h1 className=" mt-6 font-semibold text-3xl flex-1">Tickets</h1>
              <Link
                href="/CreateNotifications"
                className={`mt-6 mr-4 px-2 py-2 bg-gray-400 rounded-lg hover:bg-gray-300 flex ${
                  isSidebarOpen ? "hidden md:block" : ""
                }`}
              >
                <FaEdit size={22} className="mr-1" />
                Edit Tickets
              </Link>
            </div>

            <div className="flex bg-slate-200">
              <div className={`m-auto w-full `}>
                <div>
                  <form>
                    <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                      <div className="px-5 pb-5 w-full">
                        <div className="flex justify-between py-2">
                          <div>kettle</div>
                          <div className="flex flex-row space-x-5">
                            <div>Students raised : 10</div>
                            <button
                              className="p-1 bg-gray-300 rounded-md hover:bg-gray-200"
                              onClick={toggleDropdown}
                            >
                              <FaChevronDown size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {isDropdownOpen && (
                    <div className="mt-2 mx-4 bg-white rounded-md shadow-lg p-2">
                      {/* Dropdown items go here */}
                      <div>Dropdown Item 1</div>
                      <div>Dropdown Item 2</div>
                      {/* ... */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicket;
