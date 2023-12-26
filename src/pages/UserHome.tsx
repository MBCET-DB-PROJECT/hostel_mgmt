import "tailwindcss/tailwind.css";
import React from "react";
import UserSidebar from "@/components/UserSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import "tailwindcss/tailwind.css";

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
    <div>
      <TopBar onSidebarToggle={handleSidebarToggle} />
      <div className="flex">
        <div
          className={`md:block md:w-1/6 bg-white h-screen shadow-lg ${isSidebarOpen ? "block" : "hidden"
            }`}
        >
          <UserSidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:flex md:w-5/6 bg-slate-200 h-screen w-full">
          <div className='flex bg-slate-100 min-h-screen min-w-full'>
            <div className='flex flex-col w-full max-h-screen'>
              <div className='flex md:flex-row flex-col max-w-screen min-w-full h-1/2 '>
                <div className='flex md:w-1/2 md:items-center justify-center '>
                  <div className='flex flex-row w-2/3 md:h-2/3 h-3/4 bg-gradient-to-b from-blue-500 to-slate-300 align-center items-center rounded-2xl'>
                    <div className='flex w-1/2 h-full items-center justify-center'>
                      <img src='/Adlu.jpg' className='w-64 h-64 transition-transform transform hover:scale-105 shadow-lg rounded-2xl' alt='Your Image' />
                    </div>
                    <div className='flex flex-col text-left w-1/2'>
                      <div>Name</div>
                      <div>Room No</div>
                      <div>Semester</div>
                    </div>
                  </div>
                </div>
                <div className='flex md:flex-row flex-col md:w-1/2 md:items-center justify-center border-4 border-red-500'>
                  <div className='flex md:flex-row flex-col md:w-2/3 md:h-2/3 h-full bg-gradient-to-b from-blue-500 to-slate-300 align-center items-center rounded-2xl'>
                    <div className='flex flex-col'>
                      <div>Name</div>
                      <div>Room No</div>
                      <div>Semester</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row max-w-screen h-1/2'>
                <div className='flex w-full md:w-1/2 items-center justify-center'>
                  <div className='w-full md:h-2/3 h-full bg-gradient-to-b from-blue-500 to-slate-300 align-center items-center rounded-2xl'>
                    {/* Content */}
                  </div>
                </div>
                <div className='flex w-full md:w-1/2 items-center justify-center'>
                  <div className='w-full md:h-2/3 h-full bg-gradient-to-b from-blue-500 to-slate-300 align-center items-center rounded-2xl'>
                    {/* Content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserHome;

