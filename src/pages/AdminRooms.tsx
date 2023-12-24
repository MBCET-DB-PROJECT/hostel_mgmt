import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}
const AdminRooms: React.FC = () => {
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
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full flex justify-center items-center">
          <div className="flex justify-around   mx-5 mt-5 space-x-5 h-5/6">
            <div className="bg-white p-4 w-1/3 rounded-md shadow-md ">
              <h1 className="flex justify-center font-semibold text-2xl">
                Occupied Rooms
              </h1>
              <div className="mt-2 flex items-center justify-center border-b  p-3 border-black"></div>
              <div className="flex items-center justify-center border-b  p-3 border-black">
                smth
              </div>
              <div className="flex items-center justify-center border-b  p-3 border-black">
                smth2
              </div>
            </div>
            <div className="bg-blue-200 p-4 w-1/3 right-0 rounded-md shadow-md">
              <h1 className="flex justify-center font-semibold text-2xl">
                Unoccupied Rooms
              </h1>
              <div className="mt-2 flex items-center justify-center border-b  p-3 border-black"></div>
              <div className="flex items-center justify-center border-b  p-3 border-black">
                lala
              </div>
              <div className="flex items-center justify-center border-b  p-3 border-black">
                lala2
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button className="px-4 py-2 rounded-md bg-black text-white flex hover:bg-gray-800 mt-5">
              <FaPlus size={18} className="mt-1 mr-2" /> Add Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;
