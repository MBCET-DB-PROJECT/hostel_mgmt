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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //function to handle user button click

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
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
        <div className="md:block md:w-5/6 bg-gray-200 h-screen w-full ">
          <div className="flex justify-between items-center font-semibold text-3xl mt-6 px-4">
            <h1 className="text-center flex-1">Students List</h1>{" "}
            {/* Added flex-1 to take available space */}
            <Link href="/CreateStudent">
              <BsPersonFillAdd size={32} />
            </Link>
          </div>

          <div className="flex-col mt-8">
            <div className="bg-white rounded-lg shadow-sm mx-4">
              <div className="px-5 pb-5 py-5">details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
