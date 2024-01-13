import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import "tailwindcss/tailwind.css";
import StudentData from "../data/StudentDetails.json";
//import EditStudents from "./EditStudents/[id]";
import "./../app/globals.css";
import { motion } from "framer-motion";
import StudentsCard from "@/components/StudentsListComp";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface SidebarProps {
  isOpen: boolean;
}
const StudentsList: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false);
  // const [studentsList, setStudentsList] = useState<Student[]>(StudentData);

  useEffect(() => {
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
  }, [user]);

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

  if (!isAdmin) {
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
        <div className="p-8 font-semibold">Checking access</div>
      </div>
    );
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      {!isAdmin && (
        <div>
          <p>Access denied for non-admin users.</p>
          {/* You can add more UI elements or a redirect logic here */}
        </div>
      )}
      {isAdmin && (
        <>
          <div className={` ${isModalOpen ? "blur" : ""}`}>
            <TopBar onSidebarToggle={handleSidebarToggle} />
            <div className="flex">
              <div
                className={`md:block md:w-1/6 bg-white h-screen  ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                <Sidebar isOpen={isSidebarOpen} />
              </div>
              <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full  ">
                <div
                  className={`flex justify-between text-center ${
                    isModalOpen ? "blur" : ""
                  }`}
                >
                  <h1
                    className={`mt-6 font-semibold text-3xl flex-1 ${
                      isModalOpen ? "blur" : ""
                    }`}
                  >
                    Students List
                  </h1>
                  <Link
                    href="/CreateStudent"
                    className={`mt-6 mr-4 px-1 py-1 bg-gray-400 rounded-lg ${
                      isSidebarOpen ? "hidden md:block" : ""
                    }`}
                  >
                    <BsPersonFillAdd size={32} />
                  </Link>
                </div>

                <StudentsCard />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default StudentsList;
