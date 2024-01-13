import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useCycle,
} from "framer-motion";
import TimeComponent from "./Time";
import DateComponent from "./Date";
import "./../app/globals.css";

import { useEffect, useState } from "react";
import "./../app/globals.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app, { auth } from "@/app/firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Admin {
  name: string;
  role: string;
}

interface Notification {
  notifId: string;
  content: string;
  timestamp: any;
}

interface Tickets {
  content: string;
  ticketId: string;
  students: string[];
}

interface StudentDetails {
  stdId: string;
  name: string;
  email: string;
  password: string;
  stdclass: string;
  semester: string;
  roomno: string;
  photo: File | null;
  feespaid: boolean;
  imageUrl: string;
  role: string;
}

const items = [0, 1, 2, 3, 4];
const height = 70;
const padding = 10;

const size = 150;

export default function AdminHomeComp() {
  const scrollY = useMotionValue(0);
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const [notifsList, setNotifsList] = useState<Notification[]>([]);
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [studentDetails, setStudentDetails] = React.useState<StudentDetails[]>(
    []
  );
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [user, loading] = useAuthState(auth);
  const serverTimestamp = "01/12/2024, 10:48:55 PM";
  const width = useTransform(
    scrollY,
    [0, -getHeight(items) + size],
    ["calc(0% - 0px)", "calc(100% - 40px)"]
  );

  // Inside the fetchAdminData function
  // Inside the fetchAdminData function
  const fetchAdminData = async (adminId: string) => {
    const db = getFirestore(app);
    const adminRef = doc(db, `admin/${adminId}`);
    const adminSnapshot = await getDoc(adminRef);

    if (adminSnapshot.exists()) {
      const fetchedAdminData = adminSnapshot.data() as Admin;
      setAdminData(fetchedAdminData);
    } else {
      console.log("Admin details not found");
      setAdminData(null);
    }
  };

  // Inside the useEffect that fetches admin data
  useEffect(() => {
    if (user) {
      console.log("Fetching admin data for user:", user.uid);
      fetchAdminData(user.uid);
    }
  }, [user]);

  // Inside the return statement
  console.log("Admin data:", adminData);

  // After setting the adminData state
  console.log(
    "Admin data after setting state:",
    adminData?.name || "No admin data"
  );

  const fetchNotifications = async () => {
    try {
      const db = getFirestore(app);
      const notifsRef = collection(db, "Notification");
      const notifSnapshot = await getDocs(notifsRef);

      const notifDetailsArray: Notification[] = [];

      notifSnapshot.forEach((notifDoc) => {
        const notifData = notifDoc.data() as Notification;
        const notificationId = { ...notifData, notifId: notifDoc.id };
        notifDetailsArray.push(notificationId);
      });

      if (notifDetailsArray.length > 0) {
        setNotifsList(notifDetailsArray);
      } else {
        console.log("No Notifications found");
      }
    } catch (error) {
      console.error("Error fetching notification details", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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

  const fetchStudentDetails = async () => {
    try {
      const db = getFirestore(app);
      const studentsRef = collection(db, "student");

      const studentsSnapshot = await getDocs(studentsRef);

      const studentDetailsArray: StudentDetails[] = [];

      studentsSnapshot.forEach((studentDoc) => {
        const studentData = studentDoc.data() as StudentDetails;

        // Append the stdId to the student data
        const studentWithId = { ...studentData, stdId: studentDoc.id };

        // Add the student data to the array
        studentDetailsArray.push(studentWithId);
      });

      if (studentDetailsArray.length > 0) {
        console.log("Student details loaded:", studentDetailsArray);
        setStudentDetails(studentDetailsArray);
      } else {
        console.log("No student details found");
      }
    } catch (error) {
      console.error("Error fetching student details", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="flex jusify-between w-full md:flex-row flex-col">
      <div className="min-h-screen md:w-1/2 w-full">
        <div className="md:p-10 p-5 min-h-screen flex flex-col space-y-10">
          <p className="text-5xl text-black font-semibold md:p-0 p-2">
            Welcome {adminData?.name ? adminData.name.split(" ")[0] : "Admin"}!
          </p>

          <div className="flex justify-center items-center flex-col pt-30">
            <h1 className="p-4 text-lg font-semibold text-gray-400">
              Latest Notifications
            </h1>
            <motion.div
              style={{
                width: 400,
                height: 200,
                borderRadius: 30,
                overflow: "hidden",
                position: "relative",
                transform: "translateZ(0)",
                cursor: "grab",
              }}
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div
                style={{ width: 400, height: getHeight(items), y: scrollY }}
                drag="y"
                dragConstraints={{
                  top: -getHeight(items) + size,
                  bottom: 0,
                }}
                className="p-4"
              >
                {notifsList.map((notif, index) => (
                  <motion.div
                    style={{
                      width: 400,
                      height: height,
                      borderRadius: 20,
                      backgroundColor: "#fff",
                      position: "absolute",
                      top: (height + padding) * index,
                    }}
                    key={notif.notifId}
                    className="flex justify-center items-center "
                  >
                    {notif.content}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              style={{
                width: width,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#fff",

                bottom: 20,
                left: 20,
              }}
              className="mt-5"
            />
          </div>

          <h1 className="p-4 text-lg font-semibold text-gray-400 text-center">
            Tickets
          </h1>

          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              display: "flex",

              paddingBottom: "20px",
            }}
            className=""
          >
            {tickets.map((ticket, index) => (
              <motion.div
                key={index}
                style={{
                  minWidth: "150px",
                  minHeight: "70px",
                  flexShrink: 0,
                  marginRight: "10px",
                  backgroundColor: "#4F46E5",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  userSelect: "none",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.1 }}
              >
                {ticket.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full bg-slate-200 md:pb-0 pb-4 space-y-40">
        <div className="flex justify-center md:space-x-20 md:flex-row flex-col items-center md:mt-28 space-y-10 md:space-y-0">
          <div className="w-48 h-48 bg-gradient-to-r from-purple-600  to-blue-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
            <div className="text-6xl">{studentDetails.length}</div>{" "}
            <div className="uppercase font-semibold text-sm">Students</div>
          </div>

          <div className="w-48 h-48 bg-gradient-to-r from-purple-600  to-blue-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
            <div className="text-6xl">30 </div>{" "}
            <div className="uppercase font-semibold text-sm">Rooms</div>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center text-right">
          <div className="text-7xl font-semibold">
            {" "}
            <TimeComponent />
          </div>

          <div className="flex p-5 text-2xl">
            <DateComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

function getHeight(items: number[]) {
  const totalHeight = items.length * height;
  const totalPadding = (items.length - 1) * padding;
  const totalScroll = totalHeight + totalPadding;
  return totalScroll;
}
