import "tailwindcss/tailwind.css";
import React from "react";
import UserSidebar from "@/components/UserSideBar";
import TopBar from "@/components/AdminTopBar";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import UserHomeComp from "@/components/UserHomeComp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";

interface SidebarProps {
  isOpen: boolean;
}
const UserHome: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user,loading] = useAuthState(auth);
  //function to handle user button click

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="h-screen">
     {user ? (
      <>
      
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
      </>
     ) : (
      <span>Not logged in</span>
     )}
    </div>
  );
};

export default UserHome;
