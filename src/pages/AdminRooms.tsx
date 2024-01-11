import Sidebar from "@/components/SideBar";
import TopBar from "@/components/AdminTopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import RoomData from "../data/Rooms.json";
import AdminRoomsComp from "@/components/AdminRoomsComp";

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
  //function to handle user button click

  const [rooms, setRooms] = useState<Room[]>([]); // Use the Room interface here

  /*useEffect(() => {
    setRooms(RoomData);
  }, []);*/
  /*useEffect(() => {
    fetch("../data/Rooms.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data
        setRooms(data as Room[]); // Try setting rooms after logging
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);
*/


const auth = getAuth(app);
const [user,loading] = useAuthState(auth)
const [isAdmin, setIsAdmin] = useState(false);
const [isLoading, setLoading] = useState(true);

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



  
  const occupiedRooms = rooms.filter((room) => room.status === "occupied");
  const unoccupiedRooms = rooms.filter((room) => room.status === "unoccupied");
  //const [isScrollDisabled, setScrollDisabled] = useState(false);

    {/* dxyaaa
    useEffect(() => {
    setRooms(RoomData as Room[]);
  }, []);

  const occupiedRooms = rooms.filter((room) => room.status === "occupied");
  const unoccupiedRooms = rooms.filter((room) => room.status === "unoccupied");
  const [isScrollDisabled, setScrollDisabled] = useState(false);
  */}


  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
{/*
  useEffect(() => {
    if (isScrollDisabled) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isScrollDisabled]);
  */ }

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

          {/*   <div style={{ maxHeight: "100vh", overflow: "hidden" }}> */}

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

          {/* 
          <div
          className={`md:block md:w-5/6 bg-slate-200 h-screen w-full flex justify-center items-center flex-col ${
            isScrollDisabled ? "overflow-y-auto" : ""
          }`}
          style={{ maxHeight: "calc(100vh - 60px)" }}
        >
          <AdminRoomsComp />
          */}

          {/* <div className="flex justify-around   mx-5 mt-5 space-x-5 h-5/6">
            <div className=" bg-blue-200 p-4 md:w-1/3 w-1/2 rounded-md shadow-md ">
              <h1 className="flex justify-center font-semibold text-2xl text-center">

                Occupied Rooms
              </h1>
              <div className="mt-2 flex items-center justify-center border-b  p-3 border-black"></div>
              {occupiedRooms.map((room) => (
                <div
                  key={room.id}
                  className="mt-2 flex items-center justify-center border-b p-3 border-black"
                >
                  Room {room.number}
                </div>
              ))}
            </div>

            <div className=" bg-white p-4 md:w-1/3 w-1/2 right-0 rounded-md shadow-md">
              <h1 className="flex justify-center font-semibold text-2xl text-center">

                Unoccupied Rooms
              </h1>
              <div className="mt-2 flex items-center justify-center border-b  p-3 border-black"></div>
              {unoccupiedRooms.map((room) => (
                <div
                  key={room.id}
                  className="mt-2 flex items-center justify-center border-b p-3 border-black"
                >
                  Room {room.number}
                </div>
              ))}
            </div>
          </div>*/}
          <div className="mt-5 flex justify-center">

        {/*      <button className="px-4 py-2 rounded-md bg-black text-white flex hover:bg-gray-800 mt-5"> */}

            <button className="px-4 py-2 rounded-md bg-black text-white flex hover:bg-gray-800 mt-5 mb-5 ">

              <FaPlus size={18} className="mt-1 mr-2" /> Add Rooms
            </button>
          </div>
        </div>
      </div>
      </>
  )}
    </div>
  );
};

export default AdminRooms;