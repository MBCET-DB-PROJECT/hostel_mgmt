import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaEdit, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import TicketDetails from "./../data/TicketDetails.json";

interface SidebarProps {
  isOpen: boolean;
}

interface Student {
  id: number;
  name: string;
  class: string;
  sem: string;
  roomno: string;
  email: string;
  fees: string;
  password: string;
}

const AdminTicket: React.FC = () => {
  const [ticketsList, setTicketsList] = useState(TicketDetails); // State to store ticket details
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDropdownOpen(!isDropdownOpen);
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
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full ">
          <div className="flex justify-between text-center">
            <h1 className="mt-6 font-semibold text-3xl flex-1">Tickets</h1>
            <Link
              href="/CreateNotifications"
              className={`mt-6 mr-4 px-2 py-2 bg-gray-400 rounded-lg hover:bg-gray-300 flex ${
                isSidebarOpen ? "hidden md:block" : ""
              }`}
            >
              <FaEdit size={22} className="mr-1" />
              Edit Tickets
            </Link>
          </div>

          <div className="flex bg-slate-200">
            <div className={`m-auto w-full `}>
              <div>
                <form>
                  {ticketsList.map((ticket) => {
                    const studentCount = ticket.students.length;

                    return (
                      <div
                        key={ticket.tid}
                        className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center"
                      >
                        <div className="px-5 pb-5 w-full">
                          <div className="flex justify-between py-2">
                            <div>{ticket.name}</div>
                            <div className="flex flex-row space-x-5">
                              <div>Students raised: {studentCount}</div>
                              <button
                                className="p-1 bg-gray-300 rounded-md hover:bg-gray-200"
                                onClick={toggleDropdown}
                              >
                                <FaChevronDown size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {isDropdownOpen && (
                    <div className="mt-3 mx-4 bg-white rounded-md shadow-lg p-2">
                      <div className="mt-2 flex items-center justify-between border-b p-3 border-black">
                        <h1>thingy 1</h1>
                        <p>roomno</p>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-b p-3 border-black">
                        thingy 2
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicket;
