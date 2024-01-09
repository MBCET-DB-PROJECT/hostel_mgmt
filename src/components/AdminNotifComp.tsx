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
import { MdDelete } from "react-icons/md";
import CreateNotifications from "./../pages/CreateNotifications";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/firebase";


interface Notification {
  notifId: string;
  content: string;
  timestamp:any;
}

interface NotifCardProps {
  data : Notification;
  notifId: string;
}

interface NotifDetailsProps {
  notifId:string;
}

const NotifDetails: React.FC<NotifDetailsProps> = ({ notifId }) => {
  const [notifsList, setNotifsList] = useState<Notification[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);
  const [loadingData,setLoadingData] = React.useState(true);

const fetchNotifications = async () => {
  try {
    const db = getFirestore(app);
    const notifsRef  = collection(db,"Notification");

    const notifSnapshot = await getDocs(notifsRef);

    const notifDetailsArray: Notification[] = [];

    notifSnapshot.forEach((notifDoc) => {
      const notifData = notifDoc.data() as Notification;

      const notificationId = {...notifData,notifId: notifDoc.id}

      notifDetailsArray.push(notificationId);
    
    });
      if(notifDetailsArray.length > 0) {
        console.log("Notification data loaded",notifDetailsArray);
        setNotifsList(notifDetailsArray);
      } else {
        console.log("No Notifications found");
      }
  } catch (error)
  {
    console.error("Error fetching notification details", error);
  } finally {
    setLoadingData(false);
  };
};

React.useEffect(() => {
 fetchNotifications();
}, [notifId]);

if (loadingData) {
  return <p>Loading...</p>;
}

return (
  <div className="grid grid-cols-3 gap-3 ml-5">
      {notifsList.map((event, index) => (
        <NotifsCard key={index} data={event} notifId={event.notifId} />
      ))}
    </div>
)

}


const NotifsCard: React.FC<NotifCardProps> = ({data,notifId}) => {
 



/*interface SidebarProps {
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

const AdminNotifComp = () => {
  const students = StudentData;
 */


  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBlurry, setBlurry] = useState(false); 

  const [loadingData,setLoadingData] = React.useState(true);
 
  const [notifsList, setNotifsList] = useState<Notification[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);



      {/*      
 const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [studentsList, setStudentsList] = useState<Student[]>(StudentData); //to map student list
  const [notifsList, setNotifsList] = useState<Notif[]>(NotifData);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);
     */}

  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };



  
  
    {/*
  const handleStudentClick = (student: any) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };
  */}
  
  
  
  
      
   const handleNotifClick = (notif: any) => {
  
    setSelectedNotif(notif);
    setModalOpen(true);
  };



   { /* const handleDeleteNotif = (notif: Notif) => {
    // Filter out the notification that matches the clicked notification's nid
    const updatedNotifs = notifsList.filter((n) => n.nid !== notif.nid);
    setNotifsList(updatedNotifs);
    setModalOpen(false); // Close the modal after deletion (if desired)
  };
        */ }
  
  
  
  

  useEffect(() => {
   
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);

  return (
    <div>
      {isModalOpen && selectedNotif && (
       
        <div className="md:w-1/6 md:block shadow-lg">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white md:p-8 p-4  rounded-lg md:w-1/2 w-2/3 shadow-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">

                  Notification {data.notifId}

                  {/* Notification {selectedNotif.nid} */}

                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="hover:bg-gray-200 px-1 py-1 rounded-lg"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <p className="mt-4">{data.content}</p>

          
       { /*<div className="flex justify-between">
                <p className="mt-4">{selectedNotif.content}</p>
                <button
                  className="mt-4 hover:bg-red-300 p-2 rounded-md"
                  onClick={() => handleDeleteNotif(selectedNotif)}
                >
                  <MdDelete size={20} />
                </button>
              </div>
      */}

            </div>
          </div>
        </div>
      )}
      <div className="flex ">
        <div className="flex bg-slate-200 w-full">

          <div className={'m-auto w-full ${isBlurry ? "blur" : ""}'}>
            
              <div key={data.notifId} onClick={() => handleNotifClick(data)}>

                {/*     <div className={`m-auto w-full ${isBlurry ? "blur" : ""}`}>
            {notifsList.map((notif) => (
              <div key={notif.nid} onClick={() => handleNotifClick(notif)}>
              */}

                <form>
                  <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                    <div className="px-5 pb-5 w-full">
                      <div className="flex justify-between py-2">

                        <div>{data.content}</div>
                        <div>{data.timestamp}</div>

        {/*    <div>{notif.content}</div>
                        <div>{notif.date}</div>
                        */}

                      </div>
                    </div>
                  </div>
                </form>
              </div>

          

            {/*     ))} */}

          </div>
        </div>
      </div>
    </div>
  );
};


export default NotifDetails;

//export default AdminNotifComp;

