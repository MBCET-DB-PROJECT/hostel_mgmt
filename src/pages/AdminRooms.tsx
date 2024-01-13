import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import RoomData from "../data/Rooms.json";
import AdminRoomsComp from "@/components/AdminRoomsComp";
import { motion } from "framer-motion";
import "./../app/globals.css";
import RoomDetails from "@/components/AdminRoomsComp";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import "./../app/globals.css";

interface SidebarProps {
  isOpen: boolean;
}
interface Room {
  id: number;
  number: number;
  status: "occupied" | "unoccupied";
}

const AdminRooms: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [totalRooms, setTotalRooms] = useState<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);


  const handleAddRooms = (event: React.FormEvent) => {
    event.preventDefault();
  
    // Assuming you have a ref to the input element
    const numberOfRooms = Number(inputRef.current?.value);
  
    if (!isNaN(numberOfRooms)) {
      setTotalRooms(numberOfRooms);
  
      // Perform any additional logic for adding rooms to your Firestore collection
      // You can use the `numberOfRooms` variable to update the Firestore data
    }
  };
  

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

  useEffect(() => {
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

  const occupiedRooms = rooms.filter((room) => room.status === "occupied");
  const unoccupiedRooms = rooms.filter((room) => room.status === "unoccupied");

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  {
    /*
 
  */
  }

  return (
    <div>
      {!isAdmin && (
        <div>
          <p>Access denied for non-admin users.</p>
        </div>
      )}
      {isAdmin &&  (
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

            <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full flex justify-center items-center flex-col">
              <RoomDetails  />

              <div className="mt-5 flex justify-center">

             
              

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminRooms;
