import CreateStudent from "@/pages/CreateStudent";
import TestPage from "@/pages/TestPage";
import React from "react";
interface SidebarProps {
  isOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className="flex">
      <div
        className={`md:block md:w-1/6 bg-white h-screen shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-4 text-black">
          <h1 className="font-semibold mt-10 space-y-6 text-center flex justify-center items-center flex-col ">
            <div className="hover:bg-gray-100 p-3 w-full rounded-lg text-center">
              Home
            </div>
            <div className="hover:bg-gray-100 p-3 w-full rounded-lg text-center">
              Students
            </div>
            <div className="hover:bg-gray-100 p-3 w-full rounded-lg text-center">
              Notifications
            </div>
            <div className="hover:bg-gray-100 p-3 w-full rounded-lg text-center">
              Tickets
            </div>
            <div className="hover:bg-gray-100 p-3 w-full rounded-lg text-center">
              Rooms
            </div>
            <div className="hover:bg-gray-100 p-3 w-full rounded-lg text-center">
              Create Students
            </div>
          </h1>
          {/* Add your sidebar links or components here */}
        </div>
      </div>
      <div className="md:block md:w-5/6 bg-gray-200 h-screen w-full ">
        <CreateStudent />
      </div>
    </div>
  );
};

export default Sidebar;
