import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import CreateStudent from "./CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "./../data/StudentDetails.json";
import { MdEditNotifications } from "react-icons/md";
import NotifData from "./../data/Notifications.json";
import CreateNotifications from "./CreateNotifications";

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
              {/* ... other details */}
            </div>
          </div>
        </div>
      )}
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

            <div className="flex bg-slate-200">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
