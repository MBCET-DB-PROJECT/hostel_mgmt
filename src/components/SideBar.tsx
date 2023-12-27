import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className="p-4 w-1/6 text-black h-screen fixed top-0 left-0 z-50 flex flex-col justify-between ">
      <div className="w-full flex justify-center">
        <div
          className="font-semibold  space-y-6 text-center flex flex-col flex-grow overflow-y-auto  w-full mt-10
      "
        >
          <Link
            href="/AdminHome"
            className="hover:bg-gray-200 p-3 w-full rounded-lg flex items-center mt-10"
          >
            <FaHome size={26} />
            <h1 className="ml-2">Home</h1>
          </Link>
          <Link
            href="/StudentsList"
            className="hover:bg-gray-200 p-3 w-full rounded-lg flex items-center"
          >
            <PiStudentFill size={26} />
            <h1 className="ml-2">Students</h1>
          </Link>
          <Link
            href="/AdminNotifications"
            className="hover:bg-gray-200 p-3 w-full rounded-lg flex items-center"
          >
            <IoIosNotifications size={26} />
            <h1 className="ml-2">Notifications</h1>
          </Link>
          <Link
            href="/AdminTickets"
            className="hover:bg-gray-200 p-3 w-full rounded-lg flex items-center"
          >
            <IoTicket size={26} />
            <h1 className="ml-2">Tickets</h1>
          </Link>
          <Link
            href="/AdminRooms"
            className="hover:bg-gray-200 p-3 w-full rounded-lg flex items-center"
          >
            <FaBuilding size={26} />
            <h1 className="ml-2">Rooms</h1>
          </Link>
          <Link
            href="/CreateStudent"
            className="hover:bg-gray-200 p-3 w-full rounded-lg flex items-center"
          >
            <FaPeopleGroup size={26} />
            <h1 className="ml-2">Add&nbsp;Students</h1>
          </Link>
        </div>
      </div>
      <div className="sticky bottom-4 text-center flex justify-center items-center">
        <Link
          href="/"
          className="hover:bg-red-100 p-3 text-red-700 w-full rounded-lg flex items-center"
        >
          <TbLogout2 size={26} />
          <h1 className="ml-2 font-semibold text-lg">Logout</h1>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
