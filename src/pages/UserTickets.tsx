import "tailwindcss/tailwind.css";
import React, { useEffect } from "react";
import UserSidebar from "@/components/UserSideBar";
import TopBar from "@/components/TopBar";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import { BiUpArrowAlt } from "react-icons/bi";
import Toast from "@/components/Toast";
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import app, { auth } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface SidebarProps {
  isOpen: boolean;
}

interface Tickets {
  content: string;
  ticketId: string;
  students: string[];
}

const UserTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [user,loading] = useAuthState(auth)

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTicket(e.target.value);
    console.log(selectedTicket);
  };
  const handleCreateNotification = () => {
    setShowToast(true);
  };

  const fetchTickets = async () => {
    try {
      const db = getFirestore(app);
      const ticketsRef = collection(db, "Tickets");
      const ticketSnapshot = await getDocs(ticketsRef);
      const ticketDetailsArray: Tickets[] = [];

      for (const ticketDoc of ticketSnapshot.docs) {
        const ticketData = ticketDoc.data() as Tickets;
        const ticketsId = { ...ticketData, ticketId: ticketDoc.id };

        ticketDetailsArray.push({
          ...ticketsId,
        });
      }

      setTickets(ticketDetailsArray); // Update the state with fetched tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  
  const handleRaise = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Check if there's a selected ticket
      if (!selectedTicket) {
        console.error("No ticket selected");
        return;
      }
  
      console.log("Selected Ticket ID:", selectedTicket);
  
      const db = getFirestore(app);
  
      // Get the reference to the selected ticket document
      const ticketDocRef = doc(db, "Tickets", selectedTicket);
  
      console.log("Ticket Document Reference:", ticketDocRef);
  
      // Get the current ticket data
      const ticketDocSnapshot = await getDoc(ticketDocRef);
      const ticketData = ticketDocSnapshot.data() as Tickets;
  
      // Get the current students array or initialize it if not present
      const studentsArray = ticketData.students || [];
  
      // Check if the user's ID is already in the students array
      if (studentsArray.includes(user?.uid || "")) {
        console.error("User already in students list");
        return;
      }
  
      // Update the students array with the user's ID
      const updatedStudents = [...studentsArray, user?.uid || ""];
  
      // Update the document with the new students array
      await updateDoc(ticketDocRef, { students: updatedStudents });
  
      console.log("Ticket raised successfully");
  
      // Optionally, you can reset the selectedTicket state and show a success message
      setSelectedTicket(null);
      setShowToast(true);
  
      // Optionally, you can refetch the tickets after raising to update the dropdown
      fetchTickets();
    } catch (error) {
      console.error("Error raising ticket:", error);
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
          <UserSidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full justify-center">
          <form>
            <h1 className="flex justify-center mt-6 text-3xl font-semibold ">
              Raise A Ticket
            </h1>
            <div className="flex justify-center mt-8">
              <select
                value={selectedTicket || ""} // Set the value prop on the select element
                onChange={handleDropdownChange}
                className="p-2 border rounded-md md:w-1/4 w-1/2"
              >
                <option value="" disabled>
                  Select a ticket
                </option>
                {tickets.map((ticket, index) => (
                  <option
                    key={index}
                    value={ticket.ticketId}
                    className={index !== 0 ? "" : ""}
                  >
                    {ticket.content}
                  </option>
                ))}
              </select>
            </div>
            {selectedTicket && (
              <div className="mt-4 flex justify-center space-x-3 flex-col items-center">
                <div className="mt-4 bg-gray-300 p-4 md:w-1/4 w-1/2 rounded-md">
                  You have selected:{" "}
                  <div className="font-semibold flex justify-center mt-2 text-lg">
                    {tickets.map(
                      (ticket) =>
                        ticket.ticketId === selectedTicket && (
                          <span key={ticket.ticketId}>{ticket.content}</span>
                        )
                    )}
                  </div>
                </div>
                <button
                  onClick={handleRaise}
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
          {/* <div className="flex justify-end bg-slate-200 h-screen w-full">
            <div className="p-4 h-60 w-1/4 bg-white">hi</div>
                </div>*/}
        </div>
      </div>
    </div>
  );
};

export default UserTickets;
