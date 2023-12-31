import "tailwindcss/tailwind.css";
import React from "react";
import UserSidebar from "@/components/UserSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import UserHomeComp from "@/components/UserHomeComp";

interface SidebarProps {
  isOpen: boolean;
}
const UserHome: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //function to handle user button click

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="h-screen">
      <TopBar onSidebarToggle={handleSidebarToggle} />
      <div className="flex">
        <div
          className={`md:block md:w-1/6 bg-white h-screen  ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <UserSidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:flex md:w-5/6 bg-slate-200 w-full">
          <UserHomeComp />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
