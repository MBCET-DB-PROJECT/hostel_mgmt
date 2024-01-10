import Sidebar from "@/components/SideBar";
import TopBar from "@/components/AdminTopBar";
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

import NotifDetails from "@/components/AdminNotifComp";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";



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
  const [user,loading] = useAuthState(auth)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
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
  }, [user,isModalOpen]);
  
  if (isLoading) {
    return <div>Loading...</div>;
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

      {/*} {isModalOpen && selectedNotif && (
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
     )}*/}
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

            <NotifDetails notifId=""  />
            {/*<div className="flex bg-slate-200">
              <div className={m-auto w-full ${isBlurry ? "blur" : ""}}>

            <AdminNotifComp />
            {/*<div className="flex bg-slate-200">
              <div className={`m-auto w-full ${isBlurry ? "blur" : ""}`}>

                {notifsList.map((notif) => (
                  <div key={notif.nid} onClick={() => handleNotifClick(notif)}>
                    <form>
                      <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                        <div className="px-5 pb-5 w-full">
                          <div className="flex justify-between py-2">
                            <div>{notif.content}</div>
                            <div>{notif.date}</div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ))}
              </div>
                </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;