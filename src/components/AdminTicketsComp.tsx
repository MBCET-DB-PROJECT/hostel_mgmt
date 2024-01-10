import Sidebar from "@/components/SideBar";
import TopBar from "@/components/AdminTopBar";
import React, { useState } from "react";
import { useEffect } from "react";
import EditTickets from "./../pages/EditTickets";
import { VscCheckAll } from "react-icons/vsc";
import "tailwindcss/tailwind.css";
import { FaEdit, FaChevronDown } from "react-icons/fa";
import Link from "next/link";




import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/firebase";

interface Tickets {
  content: string;
  ticketId: string;
  students: string[];
  studentDetails: StudentDetails[];
}

interface StudentDetails {
  stdId: string;
  content: boolean;
  roomno: string;
  name: string;
  feespaid:boolean;
  stdclass:string;
  semester:string;
  imageUrl:string;
  role:string;
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
      const ticketSnapshot = await getDocs(ticketsRef);
  
      const ticketDetailsArray: Tickets[] = [];
  
      // Extract all student details from all tickets
      const allStudentDetails: StudentDetails[] = [];
  
      for (const ticketDoc of ticketSnapshot.docs) {
        const ticketData = ticketDoc.data() as Tickets;
        const ticketsId = { ...ticketData, ticketId: ticketDoc.id };
  
        console.log("Fetching students for ticket:", ticketsId);
  
        const studentDetailsArray: StudentDetails[] = [];
        for (const studentId of ticketData.students) {
          console.log("Fetching student details for ID:", studentId);
          const studentDoc = await getDoc(doc(db, "student", studentId));
          if (studentDoc.exists()) {
            const studentData = studentDoc.data() as StudentDetails;
            studentDetailsArray.push({
              ...studentData,
              stdId: studentId,
            });
          } else {
            console.log("Student not found for ID:", studentId);
          }
        }
  
        console.log("Fetched student details for ticket:", studentDetailsArray);
  
        allStudentDetails.push(...studentDetailsArray);
  
        ticketDetailsArray.push({
          ...ticketsId,
          studentDetails: studentDetailsArray,
        });
      }
  
      if (ticketDetailsArray.length > 0) {
        console.log("Tickets Data Loaded", ticketDetailsArray);
        setTickets(ticketDetailsArray);
  
        // Extract unique student details from all tickets
        const uniqueStudents: StudentDetails[] = Array.from(
          new Set(allStudentDetails.map((student) => JSON.stringify(student)))
        ).map((student) => JSON.parse(student));
  
        console.log("Unique Students:", uniqueStudents);
  
        setStudents(uniqueStudents);
      } else {
        console.log("No Tickets Found");
      }
    } catch (error) {
      console.log("error fetching tickets", error);
    } finally {
      setLoadingData(false);
    }
  };
  

  React.useEffect(() => {
    fetchTickets();
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

const AdminTicketsComp: React.FC<AdminTicketsCompProps> = ({ data, students }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
   //const [ticketsList, setTicketsList] = useState(TicketDetails);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
   const [dropdownStates, setDropdownStates] = useState<{
    [key: string]: boolean;
  }>({});  
    const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
    
    // ice-weasel
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

//import TicketDetails from "./../data/TicketDetails.json";

    
//const AdminTicketsComp = () => {
 
//  const [isDropdownOpen, setDropdownOpen] = useState(false);
 // const [selectedTicket, setSelectedTicket] = useState<any>(null);


/*
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  */
    //dxyaaa
 /* const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    ticket: any
   */
 
 /*
  ) => {
    event.preventDefault();
    event.stopPropagation();


    setSelectedTicket((prevTicket) =>
      prevTicket === ticketId ? null : ticketId
    );

    // Toggle the dropdown
    setDropdownOpen((prevState) => !prevState);
  };
    */  
//ice-weasel

const handleTicketSelect = (ticketId: string) => {
  console.log("Selecting ticket", ticketId);
  setSelectedTicket(ticketId);
  
  setDropdownOpen(false); // Close the dropdown when a ticket is selected
};
 
 // setSelectedTicket(ticketId);
/*
    setDropdownStates((prevState) => ({
      ...prevState,
      [ticket.tid]: !prevState[ticket.tid],
    }));
  };
*/
  //dxyaaa
 /* 
  const handleTicketSelect = (ticket: any) => {
    console.log("Selecting ticket", ticket);
    setSelectedTicket(ticket);
    

    setDropdownOpen(false); // Close the dropdown when a ticket is selected
  };
*/
  const handleOutsideClick = (event: any) => {

    if (
      event.target.closest(".dropdown-content") === null &&
      isDropdownOpen
    ) {
      setDropdownOpen(false);
    }
  };

  console.log('Dropdown Open:', isDropdownOpen);
  console.log('Selected Ticket:', selectedTicket);


console.log("Component students:", students);

console.log(
  "Matching students:",
  data.studentDetails.filter((student) =>
    students.some((detail) => detail.stdId === student.stdId)
  )
);





      {/* dxyaa
      // Check if any dropdown is open and close it
    const isOpen = Object.values(dropdownStates).some(
      (value) => value === true
    );

    if (isOpen) {
      setDropdownStates({});
    }
  };
  */}
  
  

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };

  }, [isDropdownOpen]);

   //dxyaaa     
/*        
  }, [dropdownStates]); // Include dropdownStates here
        */


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
                        {data.studentDetails.length}
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
                    {students.map((student) => (
                        <div
                          key={student.stdId}
                          className="flex justify-between border-b p-3 border-black "
                        >
                          <div>{student.name}</div>
                          <div>Room No: {student.roomno}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              { /*  <div className="m-auto w-full ">
          <div>
            <form className="w-full">
              {ticketsList.map((ticket) => {
                const studentCount = ticket.students.length;

                return (
                  <div key={ticket.tid} className="relative">
                    <div
                      onClick={() => handleTicketSelect(ticket)}
                      className="cursor-pointer mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center"
                    >
                      <div className="px-5 pb-5 ">
                        <div className="flex justify-between py-2">
                          <div>{ticket.name}</div>
                          <div className="flex flex-row space-x-5">
                            <div>Students raised: {studentCount}</div>
                            <button className="p-1 bg-gray-300 rounded-md hover:bg-gray-200">
                              <VscCheckAll size={22} />
                            </button>
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
                    {dropdownStates[ticket.tid] && (
                      <div
                        className="mt-3 mx-4 dropdown-content top-full left-0 bg-white rounded-md shadow-lg p-1 "
                        ref={(node) =>
                          node &&
                          node.addEventListener("click", (e) =>
                            e.stopPropagation()
                          )
                        }
                      >
                        <div className="mt-2 flex w-full ">
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
                  </div>
                );
              })}
              */}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TicketsCard;

// export default AdminTicketsComp;

