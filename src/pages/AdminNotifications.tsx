import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import CreateStudent from "./CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "../data/StudentDetails.json";
import { MdEditNotifications } from "react-icons/md";
import NotifData from "../data/Notifications.json";
import CreateNotifications from "./CreateNotifications";
import AdminNotifComp from "@/components/AdminNotifComp";
import { motion } from "framer-motion";
import NotifDetails from "@/components/AdminNotifComp";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import "./../app/globals.css";
interface SidebarProps {
  isOpen: boolean;
}
interface Student {
  id: number;
  name: string;
  class: string;
  sem: string;
  roomno: string;
  email: string;
  fees: string;
  password: string;
}
interface Notif {
  nid: number;
  content: string;
  date: string;
}
const AdminNotifications: React.FC = () => {
  const students = StudentData;

  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false); //to check whether the student details modal is open
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentsList, setStudentsList] = useState<Student[]>(StudentData); //to map student list
  const [notifsList, setNotifsList] = useState<Notif[]>(NotifData);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
    const checkAdminStatus = async (uid: string) => {
      const db = getFirestore(app);
      const adminCollectionRef = collection(db, "admin");

      try {
        const querySnapshot = await getDocs(adminCollectionRef);

        let isAdmin = false;

        querySnapshot.forEach((doc) => {
          const adminData = doc.data();

          if (adminData && adminData.roles && adminData.roles.includes(uid)) {
            isAdmin = true;
            console.log("User is an admin in document:", doc.id);
          }
        });

        setIsAdmin(isAdmin);
        setLoading(false);

        if (!isAdmin) {
          console.log("User is not an admin");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setIsAdmin(false);
        setLoading(false);
      }
    };

    if (user) {
      checkAdminStatus(user.uid);
    } else {
      setLoading(false);
    }
  }, [user, isModalOpen]);

  if (isLoading) {
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

  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };

  const handleStudentClick = (student: any) => {
    //to select particular student to show details of in student details modal
    setSelectedStudent(student);
    setModalOpen(true);
  };
  const handleNotifClick = (notif: any) => {
    //to select particular student to show details of in student details modal
    setSelectedNotif(notif);
    setModalOpen(true);
  };

  return (
    <div>
      {!isAdmin && (
        <div>
          <p>Access denied for non-admin users.</p>
        </div>
      )}
      {isAdmin && (
        <>
          <div className={` ${isBlurry ? "blur" : ""}`}>
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
                <div className="flex justify-between text-center">
                  <h1 className=" mt-6 font-semibold text-3xl flex-1">
                    Notifications
                  </h1>
                  <Link
                    href="/CreateNotifications"
                    className={`mt-6 mr-4 px-1 py-1 bg-gray-400 rounded-lg hover:bg-gray-300 ${
                      isSidebarOpen ? "hidden md:block" : ""
                    }`}
                  >
                    <MdEditNotifications size={30} />
                  </Link>
                </div>

                <AdminNotifComp />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNotifications;
