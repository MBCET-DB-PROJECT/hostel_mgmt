import "tailwindcss/tailwind.css";
import React from "react";
import UserSidebar from "@/components/UserSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import { BiUpArrowAlt } from "react-icons/bi";
import Toast from "@/components/Toast";

interface SidebarProps {
  isOpen: boolean;
}
const UserTickets: React.FC = () => {
  const [tickets, setTickets] = useState(["Kettle", "Soap", "Towel"]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTicket(e.target.value);
  };
  const handleCreateNotification = () => {
    setShowToast(true);
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
          <UserSidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full justify-center">
          <form>
            <h1 className="flex justify-center mt-6 text-3xl font-semibold ">
              Raise A Ticket
            </h1>
            <div className="flex justify-center mt-8">
              <select
                onChange={handleDropdownChange}
                className="p-2 border rounded-md md:w-1/4 w-1/2 "
              >
                <option value="" disabled selected>
                  Select a ticket
                </option>
                {tickets.map((ticket, index) => (
                  <option
                    key={index}
                    value={ticket}
                    className={index !== 0 ? "" : ""}
                  >
                    {ticket}
                  </option>
                ))}
              </select>
            </div>
            {selectedTicket && (
              <div className="mt-4 flex justify-center space-x-3 flex-col items-center">
                <div className="mt-4 bg-gray-300 p-4 md:w-1/4 w-1/2 rounded-md">
                  You have selected:{" "}
                  <div className="font-semibold flex justify-center mt-2 text-lg">
                    {selectedTicket}
                  </div>
                </div>
                <button
                  onClick={handleCreateNotification}
                  className="p-2 w-1/8 bg-black text-white mt-6 rounded-md flex hover:bg-gray-500"
                >
                  Raise{" "}
                  <BiUpArrowAlt className="mt-1 ml-1 font-semibold" size={20} />
                </button>
                {showToast && (
                  <Toast message={`Raised Ticket. `} type="success" />
                )}
              </div>
            )}
          </form>
        </div>
        {/* raised and accepted tickets here */}
      </div>
    </div>
  );
};

export default UserTickets;
