import "tailwindcss/tailwind.css";
import React from "react";
import UserSidebar from "@/components/UserSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import "tailwindcss/tailwind.css";

interface SidebarProps {
  isOpen: boolean;
}
const UserTickets: React.FC = () => {
  const [tickets, setTickets] = useState(["Kettle", "Soap", "Towel"]);

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
          <UserSidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full ">
          <h1 className="flex justify-center mt-4 text-3xl font-semibold">
            Raise A Ticket
          </h1>
          <div className="flex justify-center">drop down here </div>
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
