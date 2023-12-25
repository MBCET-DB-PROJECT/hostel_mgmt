import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

const AdminTickets: React.FC = () => {
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
          <div className="p-4 h-1/4 bg-white m-4 rounded-md shadow-md uppercase font-semibold text-xl">
            Kettle
          </div>
          <div className="p-4 h-1/4 bg-white m-4 rounded-md shadow-md uppercase font-semibold text-xl">
            soap
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
