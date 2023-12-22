import CreateStudent from "@/pages/CreateStudent";
import TestPage from "@/pages/TestPage";
import Link from "next/link";
import React from "react";
import StudentsList from "@/pages/StudentsList";
import AdminNotifications from "@/pages/AdminNotifications";
import AdminTickets from "@/pages/AdminTickets";
import AdminRooms from "@/pages/AdminRooms";

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
            <Link
              href="/"
              className="hover:bg-gray-100 p-3 w-full rounded-lg text-center"
            >
              Home
            </Link>
            <Link
              href="/StudentsList"
              className="hover:bg-gray-100 p-3 w-full rounded-lg text-center"
            >
              Students
            </Link>
            <Link
              href="AdminNotifications"
              className="hover:bg-gray-100 p-3 w-full rounded-lg text-center"
            >
              Notifications
            </Link>
            <Link
              href="/AdminTickets"
              className="hover:bg-gray-100 p-3 w-full rounded-lg text-center"
            >
              Tickets
            </Link>
            <Link
              href="/AdminRooms"
              className="hover:bg-gray-100 p-3 w-full rounded-lg text-center"
            >
              Rooms
            </Link>
            <Link
              href="/CreateStudent"
              className="hover:bg-gray-100 p-3 w-full rounded-lg text-center"
            >
              Create Students
            </Link>
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
