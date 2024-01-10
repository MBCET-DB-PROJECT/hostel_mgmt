import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { collection, doc, getDoc, getDocs, getFirestore, deleteDoc } from "firebase/firestore";
import app from "@/app/firebase";

interface Tickets {
  content: string;
  ticketId: string;
  students: string[];
}

const EditTicketsComp = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [newTicket, setNewTicket] = useState("");
  const [tickets, setTickets] = useState<Tickets[]>([]);

  const fetchTickets = async () => {
    try {
      const db = getFirestore(app);
      const ticketsRef = collection(db, "Tickets");
      const ticketSnapshot = await getDocs(ticketsRef);
      const ticketDetailsArray: Tickets[] = [];

      ticketSnapshot.forEach((ticketDoc) => {
        const ticketData = ticketDoc.data() as Tickets;
        const ticketsId = { ...ticketData, ticketId: ticketDoc.id };

        ticketDetailsArray.push({
          ...ticketsId,
        });
      });

      setTickets(ticketDetailsArray);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTicket(e.target.value);
  };

  const deleteTicket = async (ticketId: string) => {
    try {
      const db = getFirestore(app);
      const deleteDocRef = doc(db, "Tickets", ticketId);
      await deleteDoc(deleteDocRef);
      console.log("Ticket deleted successfully");
      // After deleting, you might want to fetch the tickets again to update the list
      fetchTickets();
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="w-full flex flex-col mt-4 space-y-5 justify-center items-center">
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-300 text-center p-3 w-1/6 rounded-md"
        >
          <div className="flex-1">{ticket.content}</div>
          <button
            onClick={() => deleteTicket(ticket.ticketId)}
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
