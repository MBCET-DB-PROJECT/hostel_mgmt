import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaEdit, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import TicketDetails from "./../data/TicketDetails.json";
import { useEffect } from "react";

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
  const [ticketsList, setTicketsList] = useState(TicketDetails);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    ticket: any
  ) => {
    console.log("Toggling dropdown");
    event.preventDefault();
    event.stopPropagation();

    setSelectedTicket(ticket); // Set the clicked ticket as the selected ticket

    // Toggle the dropdown
    setDropdownOpen((prevState) => !prevState);
  };

  const handleTicketSelect = (ticket: any) => {
    console.log("Selecting ticket", ticket);
    setSelectedTicket(ticket);
    setDropdownOpen(false); // Close the dropdown when a ticket is selected
  };

  const handleOutsideClick = (event: any) => {
    if (event.target.closest(".dropdown-content") === null && isDropdownOpen) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

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
            <div className="m-auto w-full ">
              <div>
                <form className="w-full">
                  {ticketsList.map((ticket) => {
                    const studentCount = ticket.students.length;

                    return (
                      <div
                        key={ticket.tid}
                        onClick={() => handleTicketSelect(ticket)}
                        className="cursor-pointer mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center"
                      >
                        <div className="px-5 pb-5 ">
                          <div className="flex justify-between py-2">
                            <div>{ticket.name}</div>
                            <div className="flex flex-row space-x-5">
                              <div>Students raised: {studentCount}</div>
                              <button
                                className="p-1 bg-gray-300 rounded-md hover:bg-gray-200"
                                onClick={(e) => toggleDropdown(e, ticket)}
                              >
                                <FaChevronDown size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {isDropdownOpen && selectedTicket && (
                    <div
                      className="mt-3 mx-4 dropdown-content rounded-md shadow-lg p-1 "
                      ref={(node) =>
                        node &&
                        node.addEventListener("click", (e) =>
                          e.stopPropagation()
                        )
                      }
                    >
                      <div className="mt-2 flex w-full ">
                        {/*<h1>{selectedTicket.name}</h1>*/}

                        <div className="w-full">
                          {selectedTicket.students.map((student: any) => (
                            <div
                              key={student.sid}
                              className="flex  justify-between border-b p-3 border-black "
                            >
                              <div>{student.name} </div>
                              <div>Room No: {student.roomno} </div>
                            </div>
                          ))}
                        </div>
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
