import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "@/app/firebase";
import { motion } from "framer-motion";
import "./../app/globals.css";
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
  feespaid: boolean;
  stdclass: string;
  semester: string;
  imageUrl: string;
  role: string;
}

const AdminTicketsComp: React.FC<{ ticketId: string }> = ({ ticketId }) => {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [students, setStudents] = useState<StudentDetails[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const fetchTickets = async () => {
    try {
      const db = getFirestore(app);
      const ticketsRef = collection(db, "Tickets");
      const ticketSnapshot = await getDocs(ticketsRef);

      const ticketDetailsArray: Tickets[] = [];
      const allStudentDetails: StudentDetails[] = [];

      for (const ticketDoc of ticketSnapshot.docs) {
        const ticketData = ticketDoc.data() as Tickets;
        const ticketsId = { ...ticketData, ticketId: ticketDoc.id };

        const studentDetailsArray: StudentDetails[] = [];
        for (const studentId of ticketData.students) {
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

        allStudentDetails.push(...studentDetailsArray);

        ticketDetailsArray.push({
          ...ticketsId,
          studentDetails: studentDetailsArray,
        });
      }

      if (ticketDetailsArray.length > 0) {
        setTickets(ticketDetailsArray);

        const uniqueStudents: StudentDetails[] = Array.from(
          new Set(allStudentDetails.map((student) => JSON.stringify(student)))
        ).map((student) => JSON.parse(student));

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

  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    ticketId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setOpenDropdowns((prevDropdowns) => {
      const isDropdownOpen = prevDropdowns.includes(ticketId);
      return isDropdownOpen
        ? prevDropdowns.filter((id) => id !== ticketId)
        : [...prevDropdowns, ticketId];
    });
  };

  const handleOutsideClick = (event: any) => {
    if (event.target.closest(".dropdown-content") === null) {
      setOpenDropdowns([]);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [ticketId]);

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <motion.div
          style={{
            width: 100,
            height: 100,
            borderRadius: 30,
            backgroundColor: "#8e24aa",
          }}
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 2, repeat: Infinity }}
        />
        <div className="p-8 font-semibold">Loading</div>
      </div>
    );
  }

  return (
    <>
      {tickets.map((ticket, index) => (
        <div key={index} className="flex bg-slate-200">
          <div className="m-auto w-full">
            <div>
              <form className="w-full">
                <div
                  onClick={(e) => toggleDropdown(e, ticket.ticketId)}
                  className="cursor-pointer mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center"
                >
                  <div className="px-5 pb-5 ">
                    <div className="flex justify-between py-2">
                      <div>{ticket.content}</div>
                      <div className="flex flex-row space-x-5">
                        <div>
                          Students raised: {ticket.studentDetails.length}
                        </div>
                        <button
                          className="p-1 bg-gray-300 rounded-md hover:bg-gray-200"
                          onClick={(e) => toggleDropdown(e, ticket.ticketId)}
                        >
                          <FaChevronDown size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {openDropdowns.includes(ticket.ticketId) && (
                  <div
                    className="mt-3 mx-4 dropdown-content bg-white rounded-md shadow-lg p-1 "
                    ref={(node) =>
                      node &&
                      node.addEventListener("click", (e) => e.stopPropagation())
                    }
                  >
                    <div className="mt-2 flex w-full ">
                      <div className="w-full">
                        {ticket.studentDetails.map((student) => (
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
              </form>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminTicketsComp;
