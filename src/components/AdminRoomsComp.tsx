import Sidebar from "@/components/SideBar";
import TopBar from "@/components/AdminTopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import RoomData from "../data/Rooms.json";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/firebase";



interface SidebarProps {
  isOpen: boolean;
}
interface Room {
  id: number;
  number: number;
  status: "occupied" | "unoccupied";
}


interface StudentDetails {
  roomno: string;
  count: number;
}

interface RoomCardProps {
  data: StudentDetails;
}

interface RoomDetailsProps {}

const RoomDetails: React.FC<RoomDetailsProps> = ({}) => {
  const [roomDetails, setRoomDetails] = React.useState<StudentDetails[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const fetchRoomno = async () => {
    const db = getFirestore(app);
    const roomsRef = collection(db, "student");

    try {
      const roomsSnapshot = await getDocs(roomsRef);
      const uniqueRoomNumbers = new Set<string>();

      const roomCountMap = new Map<string, number>();

      const fetchedRoomDetails = roomsSnapshot.docs.reduce((acc, doc) => {
        const roomno = doc.data().roomno;

        // Increment count for each roomno
        const count = roomCountMap.get(roomno) || 0;
        roomCountMap.set(roomno, count + 1);

        return acc;
      }, [] as StudentDetails[]);

      // Filter unique roomno values
      const uniqueRoomDetails = Array.from(roomCountMap).map(
        ([roomno, count]) => ({
          roomno,
          count,
        })
      );

      setRoomDetails(uniqueRoomDetails);
    } catch (error: any) {
      console.log("Error fetching room numbers:", error.code, error.message);
    } finally {
      setLoadingData(false);
    }
  };
  React.useEffect(() => {
    fetchRoomno();
  }, []);

  if (loadingData) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex justify-around   mx-5 mt-5 space-x-5 h-5/6">
      <div className=" bg-blue-200 p-4 md:w-1/3 w-1/2 rounded-md shadow-md ">
        <h1 className="flex justify-center font-semibold text-2xl text-center">
          Occupied Rooms
        </h1>
        <div className="mt-2 flex items-center justify-center border-b  p-3 border-black"></div>
        {roomDetails.map((room, index) => (
          <RoomsCard key={index} data={room} />
        ))}
      </div>

      <div className=" bg-white p-4 md:w-1/3 w-1/2 right-0 rounded-md shadow-md">
        <h1 className="flex justify-center font-semibold text-2xl text-center">
          Unoccupied Rooms
        </h1>
        <div className="mt-2 flex items-center justify-center border-b  p-3 border-black"></div>
        <div className="mt-2 flex items-center justify-center border-b p-3 border-black">
          Room
        </div>
      </div>
    </div>
  );
};

const RoomsCard: React.FC<RoomCardProps> = ({ data }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //function to handle user button click

  // const [rooms, setRooms] = useState<Room[]>([]); // Use the Room interface here

 /*const AdminRoomsComp = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //function to handle user button click

  const [rooms, setRooms] = useState<Room[]>([]); // Use the Room interface here
  */


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

  /* useEffect(() => {
    setRooms(RoomData as Room[]);
  }, []);
*/
  /*
  const occupiedRooms = rooms.filter((room) => room.status === "occupied");
  const unoccupiedRooms = rooms.filter((room) => room.status === "unoccupied");
*/
/*
  useEffect(() => {
    setRooms(RoomData as Room[]);
  }, []);

  const occupiedRooms = rooms.filter((room) => room.status === "occupied");
  const unoccupiedRooms = rooms.filter((room) => room.status === "unoccupied");
*/
  
  
  
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (

    <div>
      <div className="mt-2 flex items-center justify-center border-b p-3 border-black">
        Room {data.roomno} (Count: {data.count})

        {/*   <div className="flex justify-around   mx-5 mt-5 space-x-5 h-5/6">
      <div className=" bg-blue-200 p-4 md:w-1/3 w-1/2 rounded-md shadow-md overflow-y-auto ">
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

      <div className=" bg-white p-4 md:w-1/3 w-1/2 right-0 rounded-md shadow-md overflow-y-auto">
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
        */}

      </div>
    </div>
  );
};


export default RoomDetails;

//export default AdminRoomsComp;

