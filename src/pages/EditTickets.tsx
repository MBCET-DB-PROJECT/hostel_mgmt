import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}
const EditTickets: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [newTicket, setNewTicket] = useState("");
  const [tickets, setTickets] = useState(["Kettle", "Soap", "Towel"]);
  //function to handle user button click

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTicket(e.target.value);
  };

  const handleAddTicket = () => {
    if (newTicket.trim() !== "") {
      setTickets([...tickets, newTicket.trim()]);
      setNewTicket("");
    }
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
          <h1 className="flex justify-center text-3xl font-semibold mt-4">
            Edit Tickets
          </h1>
          <h2 className="text-lg flex justify-center mt-4 font-semibold">
            Current tickets :{" "}
          </h2>
          <div className="flex flex-col  mt-4 space-y-5 justify-center items-center">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="flex justify-center items-center bg-gray-300 text-center p-3 w-1/6 rounded-md"
              >
                {ticket}
              </div>
            ))}

            <div className="flex justify-center items-center w-1/6">
              <input
                type="text"
                value={newTicket}
                onChange={handleInputChange}
                placeholder="Enter new ticket"
                className="p-2 border rounded-md"
              />
              <button
                onClick={handleAddTicket}
                className="ml-2 p-2 bg-gray-300 rounded-md font-semibold hover:bg-gray-400 flex"
              >
                <FaPlus className="mr-2 mt-1" /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTickets;
