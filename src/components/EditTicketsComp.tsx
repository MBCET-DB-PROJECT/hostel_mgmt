import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EditTicketsComp = () => {
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
  const handleDeleteTicket = (ticketToDelete: string) => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket !== ticketToDelete
    );
    setTickets(updatedTickets);
  };
  const handleAddTicket = () => {
    if (newTicket.trim() !== "") {
      setTickets([...tickets, newTicket.trim()]);
      setNewTicket("");
    }
  };
  return (
    <div className="w-full flex flex-col mt-4 space-y-5 justify-center items-center">
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-300 text-center p-3 w-1/6 rounded-md"
        >
          <div className="flex-1">{ticket}</div>
          <button
            onClick={() => handleDeleteTicket(ticket)}
            className="rounded-md hover:bg-red-300 p-1"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};


export default EditTicketsComp;

//export default EditTicketsComp;

