import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
interface SidebarProps {
  isOpen: boolean;
}
const CreateStudent: React.FC<SidebarProps> = ({ isOpen }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //function to handle user button click

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <TopBar />
      <div className="flex">
        <div
          className={`md:block md:w-1/6 bg-white h-screen shadow-lg ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:block md:w-5/6 bg-gray-100 h-screen w-full ">
          <div className="flex justify-center text-center">
            <h1 className=" mt-2 font-semibold text-3xl">Add Students</h1>
          </div>
          <div className="flex bg-gray-100">
            <div className="m-auto">
              <div>
                <div className="mt-5 bg-white rounded-lg shadow-lg">
                  <div className="flex">
                    <div className="flex-1 py-5 pl-5 overflow-hidden">
                      <h1 className="inline text-2xl font-semibold leading-none">
                        Create Student Account
                      </h1>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <input
                      placeholder="Name"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                      required
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                      required
                    />
                    <input
                      placeholder="Password"
                      type="password"
                      className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current"
                      required
                    />{" "}
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

export default CreateStudent;
