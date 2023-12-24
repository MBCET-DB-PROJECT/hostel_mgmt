import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
interface SidebarProps {
  isOpen: boolean;
}

import { MdAdd } from "react-icons/md";
const CreateNotifications: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const [notificationContent, setNotificationContent] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationContent(event.target.value);
  };

  const handleCreateNotification = () => {
    console.log(notificationContent);
    setNotificationContent("");
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
          <div className=" mt-6 flex justify-center items-center text-center">
            <div className="container mx-auto mt-10">
              <div className="px-1">
                <h1 className="text-3xl font-semibold mb-4">
                  Create New Notification
                </h1>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-semibold mb-5"
                  htmlFor="notificationContent"
                >
                  Enter new notification :
                </label>
                <input
                  type="text"
                  id="notificationContent"
                  placeholder="Enter notification content..."
                  value={notificationContent}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-2/3 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                onClick={handleCreateNotification}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-3"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotifications;
