import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Toast from "@/components/Toast";
import { useEffect } from "react";
import NotifData from "../data/Notifications.json";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import AdminNotifications from "./AdminNotifications";

import { MdAdd } from "react-icons/md";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import app from "@/app/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";



interface SidebarProps {
  isOpen: boolean;
}
interface Notification {
  content: string;
  timestamp:any;
}


const CreateNotifications: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState<string>("");
  const [nid, setNid] = useState<number>(1);
  const [showToast, setShowToast] = useState(false);
  const [notifIdCounter, setNotifIdCounter] = useState<number>(0);
  const [newNotification, setNewNotification] = useState<Notification | null>(
    null
  );
    const [formData,setFormData] = useState<Notification> ({
       
      content: "",
      timestamp:"",
    })

    const auth = getAuth(app);
  const [user,loading] = useAuthState(auth)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide the toast after 3 seconds

      return () => clearTimeout(timer);
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
  }, [user,showToast]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }



    const generateUniqueNotificationId = (): string => {
      const notifDocRef = doc(collection(getFirestore(app), "Notification"));
      return notifDocRef.id;
    };
  

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name,value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { content } = formData

      try{
        const db = getFirestore(app);
        const notifNo = generateUniqueNotificationId()
        
        const notifDocRef = doc(db,"Notification",notifNo);

        const notifData = {
          content, 
          timestamp: new Date().toLocaleDateString(),
        };

        await setDoc(notifDocRef,notifData);
        console.log("Notification created successfully");

        setFormData({
          
          content:"",
          timestamp:""
        });
      } catch (error: any) {
        console.error("error creating notification",error.code,error.message);
      }
    }

  

  /*useEffect(() => {
    // Find the highest nid from the JSON file
    const maxNid = Math.max(
      ...NotifData.map((notif: Notification) => notif.nid),
      0
    );
  }, []);
  const maxNid = Math.max(
    ...NotifData.map((notif: Notification) => notif.nid),
    0
  );
  */


  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
/*
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationContent(event.target.value);
  };

  const handleCreateNotification = () => {
    const notification = {
      nid: maxNid + 1,
      content: notificationContent,
      date: new Date().toLocaleDateString(),
    };
    setNewNotification(notification); //newNotification state for toast
    setShowToast(true);
    NotifData.push(notification);
    setNid((prevNid) => prevNid + 1);
    console.log(notification);
    setNotificationContent("");
  };
*/


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
          <div className=" mt-6 flex justify-center items-center text-center">
            <div className="px-1 container mx-auto mt-10 ">
              <div className=" flex justify-between">
                <h1 className="text-3xl font-semibold mb-4 flex-1">
                  Create New Notification
                </h1>

                {/*      <Link */}

                {/*<Link

                  href="/AdminNotifications"
                  className="bg-black hover:bg-gray-800 text-white font-bold px-2 py-1 rounded flex mr-2 mt-2"
                >
                  <IoMdArrowRoundBack size={20} className="mt-1 mr-2" /> Back

                </Link>
=======
        </Link>*/}

              </div>
          <form onSubmit={handleSubmit} >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-semibold mb-5"
                  htmlFor="notificationContent"
                >
                  Enter new notification :
                </label>
                <input
                  type="text"
                  name="content"
                  value={formData.content}
                  id="notificationContent"
                  placeholder="Enter notification content..."

                
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-2/3 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

        /*          value={notificationContent}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-2/3 md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  */

                />
              </div>

              <button
              type="submit"
               
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-3"
              >
                Create
              </button>
              </form>
             {/* {showToast && newNotification && (
                <Toast
                  message={`Successfully created - nid: ${
                    maxNid + 1
                  },content: ${
                    newNotification.content
                  }, date: ${new Date().toLocaleDateString()}`}
                  type="success"
                />
              )}
                */}
            </div>
          </div>
        </div>
      </div>
      </>
    )}
    </div>
  );
};

export default CreateNotifications;