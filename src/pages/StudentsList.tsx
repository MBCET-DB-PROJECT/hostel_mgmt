import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import "tailwindcss/tailwind.css";
import StudentData from "../data/StudentDetails.json";
//import EditStudents from "./EditStudents/[id]";

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
  const [user,loading] = useAuthState(auth)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
      const [isModalOpen, setModalOpen] = useState(false); 
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false); 
 // const [studentsList, setStudentsList] = useState<Student[]>(StudentData); 

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const db = getFirestore(app);
        const adminCollectionRef = collection(db, 'admin');
  
        console.log('User UID:', currentUser.uid);
  
        try {
          const querySnapshot = await getDocs(adminCollectionRef);
    
          querySnapshot.forEach((doc) => {
            const adminData = doc.data();
            
            if (adminData && adminData.role && adminData.role.includes(currentUser.uid)) {
              setIsAdmin(true);
              setLoading(false);
              console.log('User is an admin');
              // If you want to break out of the loop when an admin is found, you can use 'return;'
            } else {
              setIsAdmin(false);
              setLoading(false);
              console.log('User is not an admin');
            }
          });
        } catch (error) {
          console.error('Error fetching admin data:', error);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };
  
    fetchUserData();
  }, [user]);
  
  if (isLoading) {
    return <div>Loading...</div>;
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
