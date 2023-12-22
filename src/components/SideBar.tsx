import CreateStudent from "@/pages/CreateStudent";
import TestPage from "@/pages/TestPage";
import Link from "next/link";
import React from "react";
import StudentsList from "@/pages/StudentsList";
import AdminNotifications from "@/pages/AdminNotifications";
import AdminTickets from "@/pages/AdminTickets";
import AdminRooms from "@/pages/AdminRooms";
import { FaHome } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";

interface SidebarProps {
  isOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className="p-4 text-black">
      <h1 className="font-semibold mt-10 space-y-6 text-center flex justify-center items-center flex-col ">
        <Link
          href="/"
          className="hover:bg-gray-100 p-3 w-full rounded-lg flex "
        >
          <div className="w-1/3 flex justify-center">
            <FaHome size={24} />
          </div>
          <h1 className="flex">Home</h1>
        </Link>
        <Link
          href="/StudentsList"
          className="hover:bg-gray-100 p-3 w-full rounded-lg flex"
        >
          <div className="w-1/3 flex justify-center">
            <PiStudentFill size={28} />
          </div>
          <h1 className="flex">Students</h1>
        </Link>
        <Link
          href="/AdminNotifications"
          className="hover:bg-gray-100 p-3 w-full rounded-lg flex"
        >
          <div className="w-1/3 flex justify-center">
            <IoIosNotifications size={26} />
          </div>
          <h1 className="flex">Notifications</h1>
        </Link>
        <Link
          href="/AdminTickets"
          className="hover:bg-gray-100 p-3 w-full rounded-lg flex"
        >
          <div className="w-1/3 flex justify-center">
            <IoTicket size={24} />
          </div>
          <h1 className="flex">Tickets</h1>
        </Link>
        <Link
          href="/AdminRooms"
          className="hover:bg-gray-100 p-3 w-full rounded-lg flex"
        >
          <div className="w-1/3 flex justify-center">
            <FaBuilding size={22} />
          </div>
          <h1 className="flex">Rooms</h1>
        </Link>
        <Link
          href="/CreateStudent"
          className="hover:bg-gray-100 p-3 w-full rounded-lg flex"
        >
          <div className="w-1/3 flex justify-center">
            <FaPeopleGroup size={28} />
          </div>
          <h1 className="flex">Add Students</h1>
        </Link>
      </h1>
      {/* Add your sidebar links or components here */}
    </div>
  );
};

export default Sidebar;
