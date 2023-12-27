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
import UserSidebar from "@/components/UserSideBar";

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

const UserNotifications: React.FC = () => {
  const students = StudentData;

  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false); //to check whether the student details modal is open
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentsList, setStudentsList] = useState<Student[]>(StudentData); //to map student list
  const [notifsList, setNotifsList] = useState<Notif[]>(NotifData);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

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

  useEffect(() => {
    //to set background to blur when modal is open
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);

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
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full ">
          <div className="flex justify-center text-center">
            <h1 className=" mt-6 font-semibold text-3xl ">Notifications</h1>
          </div>
          <AdminNotifComp />
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
