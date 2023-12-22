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
        <div className="md:block md:w-5/6 bg-gray-100 h-screen w-full ">
          <div className="flex justify-between text-center">
            <h1 className=" mt-6 font-semibold text-3xl flex-1">
              Students List
            </h1>
            <Link
              href="/CreateStudent"
              className={`mt-6 mr-2 px-1 py-1 bg-gray-400 rounded-lg ${
                isSidebarOpen ? "hidden md:block" : ""
              }`}
            >
              <BsPersonFillAdd size={32} />
            </Link>
          </div>
          <div className="flex bg-gray-100">
            <div className="m-auto w-full">
              <div>
                <form>
                  <div className="mt-5 bg-white rounded-lg shadow-lg mx-4 text-center items-center">
                    <div className="px-5 pb-5 w-full">
                      <div className="flex justify-between py-2">
                        <div>name</div>
                        <div className="flex right-0 w-1/4 justify-between">
                          <div className="hidden md:block">class</div>
                          <div className="hidden md:block">sem</div>
                          <div
                            className={`flex ${
                              isSidebarOpen ? "hidden md:block" : ""
                            }`}
                          >
                            roomno
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
