import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import RoomData from "../data/Rooms.json";

interface SidebarProps {
  isOpen: boolean;
}
interface Room {
  id: number;
  number: number;
  status: "occupied" | "unoccupied";
}
const AdminRoomsComp = () => {
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
  useEffect(() => {
    setRooms(RoomData as Room[]);
  }, []);

  const occupiedRooms = rooms.filter((room) => room.status === "occupied");
  const unoccupiedRooms = rooms.filter((room) => room.status === "unoccupied");

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex justify-around   mx-5 mt-5 space-x-5 h-5/6">
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
    </div>
  );
};

export default AdminRoomsComp;