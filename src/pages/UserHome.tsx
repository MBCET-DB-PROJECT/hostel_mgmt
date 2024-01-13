import "tailwindcss/tailwind.css";
import React from "react";
import UserSidebar from "@/components/UserSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import UserHomeComp from "@/components/UserHomeComp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { motion } from "framer-motion";
import "./../app/globals.css";
interface SidebarProps {
  isOpen: boolean;
}
const UserHome: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
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
        <div className="flex justify-center items-center h-screen flex-col">
          <motion.div
            style={{
              width: 100,
              height: 100,
              borderRadius: 30,
              backgroundColor: "#8e24aa",
            }}
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 2, repeat: Infinity }}
          />
          <div className="p-8 font-semibold">Checking access</div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
