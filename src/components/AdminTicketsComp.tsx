import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaEdit, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

import { useEffect } from "react";
import EditTickets from "@/pages/EditTickets";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/firebase";

interface Tickets {
  content: string;
  ticketId: string;
}

interface StudentDetails {
  stdId: string;
  content: boolean;
  roomno: string;
  name: string;
}

interface TicketDetailsProps {
  ticketId: string;
}

interface AdminTicketsCompProps {
  data: Tickets;

  students: StudentDetails[];
}

const TicketsCard: React.FC<TicketDetailsProps> = ({ ticketId }) => {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [students, setStudents] = useState<StudentDetails[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);

  const fetchTickets = async () => {
    try {
      const db = getFirestore(app);
      const ticketsRef = collection(db, "Tickets");
      const raisedRef = collection(db, "student");
     

      
      const raisedSnapshot = await getDocs(raisedRef);
      const ticketSnapshot = await getDocs(ticketsRef);

      const ticketDetailsArray: Tickets[] = [];

      raisedSnapshot.forEach(async (raisedDoc) => {
        const raisedId = raisedDoc.id;
        const raisedData = raisedDoc.data();
        console.log("raisedticket:",raisedData);

        
      
      })



      ticketSnapshot.forEach((ticketDoc) => {
        const ticketData = ticketDoc.data() as Tickets;

        const ticketsId = { ...ticketData, ticketId: ticketDoc.id };

        ticketDetailsArray.push(ticketsId);
      });
      if (ticketDetailsArray.length > 0) {
        console.log("Tickets Data Loaded", ticketDetailsArray);
        setTickets(ticketDetailsArray);
      } else {
        console.log("No Tickets Found");
      }
    } catch (error) {
      console.log("error fetching tickets", error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const db = getFirestore(app);
      const studentsRef = collection(db, "student");
     
      const studentSnapshot = await getDocs(studentsRef);
     

      const studentsDetailsArray: StudentDetails[] = [];

      studentSnapshot.forEach(async (studentDoc) => {
        const studentId = studentDoc.id;
        const studentData = studentDoc.data();

        const raisedTickets: StudentDetails = {
          stdId: studentId,
          content: false,
          roomno: "",
          name: "",
        };

        const ticketsRef = collection(db, "student", studentId, "tickets");
        const ticketsSnapshot = await getDocs(ticketsRef);

        ticketsSnapshot.forEach((ticketDoc) => {
          const ticketName = ticketDoc.id;
          const ticketData = ticketDoc.data();
          console.log("ticketdata:", ticketData);

          // Check if content field exists and its value for the specific ticketName is true
          const hasTicket =
            ticketData &&
            typeof ticketData.content === "object" &&
            ticketData.content &&
            ticketData.content[ticketName] === true;

          // If 'content' is still undefined, provide a default value
          const contentOrDefault = ticketData.content || {};

       

          if (hasTicket) {
            raisedTickets.content = true; // Set content to true if any ticket is raised
          }
        });

       
        studentsDetailsArray.push(raisedTickets);
      });

      if (studentsDetailsArray.length > 0) {
        console.log("Students Data Loaded", studentsDetailsArray);
        setStudents(studentsDetailsArray);
      } else {
        console.log("No Students Found");
      }
    } catch (error) {
      console.log("error fetching students", error);
    }
  };

  React.useEffect(() => {
    fetchTickets();
    fetchStudents();
  }, [ticketId]);

  if (loadingData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {tickets.map((ticket, index) => (
        <AdminTicketsComp key={index} data={ticket} students={students} />
      ))}
    </>
  );
};

const AdminTicketsComp: React.FC<AdminTicketsCompProps> = ({
  data,
  students,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    ticketId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedTicket((prevTicket) =>
      prevTicket === ticketId ? null : ticketId
    );

    // Toggle the dropdown
    setDropdownOpen((prevState) => !prevState);
  };

  const handleTicketSelect = (ticketId: string) => {
    console.log("Selecting ticket", ticketId);
    setSelectedTicket(ticketId);
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
      <div className="flex bg-slate-200">
        <div className="m-auto w-full">
          <div>
            <form className="w-full">
              <div
                onClick={() => handleTicketSelect(data.ticketId)}
                className="cursor-pointer mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center"
              >
                <div className="px-5 pb-5 ">
                  <div className="flex justify-between py-2">
                    <div>{data.content}</div>
                    <div className="flex flex-row space-x-5">
                      <div>
                        Students raised:{" "}
                        {
                          students.filter((student) =>
                            data.content.includes(student.stdId)
                          ).length
                        }
                      </div>

                      <button
                        className="p-1 bg-gray-300 rounded-md hover:bg-gray-200"
                        onClick={(e) => toggleDropdown(e, data.ticketId)}
                      >
                        <FaChevronDown size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {isDropdownOpen && selectedTicket === data.ticketId && (
                <div
                  className="mt-3 mx-4 dropdown-content bg-white rounded-md shadow-lg p-1 "
                  ref={(node) =>
                    node &&
                    node.addEventListener("click", (e) => e.stopPropagation())
                  }
                >
                  <div className="mt-2 flex w-full ">
                    <div className="w-full">
                      {students.map((student) => {
                        if (data.content.includes(student.stdId)) {
                          return (
                            <div
                              key={student.stdId}
                              className="flex  justify-between border-b p-3 border-black "
                            >
                              <div>{student.name} </div>
                              <div>Room No: {student.roomno} </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsCard;
