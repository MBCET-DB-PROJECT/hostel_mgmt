import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import RoomData from "../data/Rooms.json";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/firebase";
import { motion } from "framer-motion";
import "./../app/globals.css";
interface SidebarProps {
  isOpen: boolean;
}

interface Room {
  id: number;
  number: number;
  status: string;
}

interface RoomDetailsProps {}

const RoomDetails: React.FC<RoomDetailsProps> = ({}) => {
  const totalRooms = 50;

  const [roomDetails, setRoomDetails] = React.useState<Room[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);

  const fetchRoomDetails = async () => {
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
      }, [] as Room[]);

      // Filter unique roomno values
      const uniqueRoomDetails = Array.from(roomCountMap).map(
        ([roomno, count]) => ({
          id: parseInt(roomno),
          number: parseInt(roomno),
          status: count > 0 ? "occupied" : "unoccupied",
        })
      );

      setRoomDetails(uniqueRoomDetails);
    } catch (error: any) {
      console.log("Error fetching room details:", error.code, error.message);
    } finally {
      setLoadingData(false);
    }
  };

  React.useEffect(() => {
    fetchRoomDetails();
  }, []);

  if (loadingData) {
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

  const occupiedRooms = roomDetails.filter(
    (room) => room.status === "occupied"
  );
  const occupiedRoomNumbers = occupiedRooms.map((room) => room.number);

  const unoccupiedRooms: Room[] = Array.from({ length: totalRooms })
    .map((_, index) => ({
      id: index + 1,
      number: index + 1,
      status: occupiedRoomNumbers.includes(index + 1)
        ? "occupied"
        : "unoccupied",
    }))
    .filter((room) => room.status === "unoccupied");

  return (
    <div className="flex justify-around mx-5 mt-5 space-x-5 h-5/6">
      <div className="bg-blue-200 p-4 md:w-1/3 w-1/2 rounded-md shadow-md overflow-y-auto">
        <h1 className="flex justify-center font-semibold text-2xl text-center">
          Occupied Rooms
        </h1>
        <div className="mt-2 flex items-center justify-center border-b p-3 border-black"></div>
        {occupiedRooms.map((room) => (
          <div
            key={room.id}
            className="mt-2 flex items-center justify-center border-b p-3 border-black"
          >
            Room {room.number}
          </div>
        ))}
      </div>

      <div className="bg-white p-4 md:w-1/3 w-1/2 right-0 rounded-md shadow-md overflow-y-auto">
        <h1 className="flex justify-center font-semibold text-2xl text-center">
          Unoccupied Rooms
        </h1>
        <div className="mt-2 flex items-center justify-center border-b p-3 border-black"></div>
        {unoccupiedRooms.map((room) => (
          <div
            key={String(room.id)}
            className="mt-2 flex items-center justify-center border-b p-3 border-black"
          >
            Room {room.number} (Unoccupied)
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomDetails;