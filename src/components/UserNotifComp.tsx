import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import CreateStudent from "./../pages/CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "../data/StudentDetails.json";
import { MdEditNotifications } from "react-icons/md";
import NotifData from "../data/Notifications.json";
import CreateNotifications from "./../pages/CreateNotifications";
import { MdDelete } from "react-icons/md";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/firebase";
import { motion } from "framer-motion";
import "./../app/globals.css";

interface SidebarProps {
  isOpen: boolean;
}

interface Notification {
  notifId: string;
  content: string;
  timestamp: any;
}

const UserNotifComp: React.FC = () => {
  const students = StudentData;

  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false); //to check whether the student details modal is open
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  //to map student list
  const [notifsList, setNotifsList] = useState<Notification[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);
  const [loadingData, setLoadingData] = React.useState(true);

  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };

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
        console.log("Notification data loaded", notifDetailsArray);
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

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    //to set background to blur when modal is open
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);

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

  const handleStudentClick = (student: any) => {
    //to select particular student to show details of in student details modal
    setSelectedStudent(student);
    setModalOpen(true);
  };
  const handleNotifClick = (notif: any) => {
    setSelectedNotif(notif);
    setModalOpen(true);
  };

  return (
    <div>
      {isModalOpen && selectedNotif && (
        //modal for student details
        <div className="md:w-1/6 md:block shadow-lg">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white md:p-8 p-4  rounded-lg md:w-1/2 w-2/3 shadow-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">
                  Notification {selectedNotif.nid}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="hover:bg-gray-200 px-1 py-1 rounded-lg"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <p className="mt-4">{selectedNotif.content}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex ">
        <div className="flex bg-slate-200 w-full">
          <div className={`m-auto w-full ${isBlurry ? "blur" : ""}`}>
            {notifsList.map((notif) => (
              <div key={notif.notifId} onClick={() => handleNotifClick(notif)}>
                <form>
                  <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                    <div className="px-5 pb-5 w-full">
                      <div className="flex justify-between py-2">
                        <div>{notif.content}</div>
                        <div>{notif.timestamp}</div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotifComp;
