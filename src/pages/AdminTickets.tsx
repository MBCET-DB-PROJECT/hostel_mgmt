import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaEdit, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import TicketDetails from "./../data/TicketDetails.json";
import { useEffect } from "react";
import EditTickets from "./EditTickets";

import AdminTicketsComp from "@/components/AdminTicketsComp";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app, { auth } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//import AdminTicketsComp from "@/components/AdminTicketsComp";


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

const AdminTicket: React.FC = () => {
  const [ticketsList, setTicketsList] = useState(TicketDetails);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, loading] = useAuthState(auth);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    ticket: any
  ) => {
    console.log("Toggling dropdown");
    event.preventDefault();
    event.stopPropagation();

    setSelectedTicket(ticket); // Set the clicked ticket as the selected ticket

    // Toggle the dropdown
    setDropdownOpen((prevState) => !prevState);
  };

  const handleTicketSelect = (ticket: any) => {
    console.log("Selecting ticket", ticket);
    setSelectedTicket(ticket);
    setDropdownOpen(false); // Close the dropdown when a ticket is selected
  };

  const handleOutsideClick = (event: any) => {
    if (event.target.closest(".dropdown-content") === null && isDropdownOpen) {
      setDropdownOpen(false);
    }
  };

  const checkAdminStatus = async (uid: string) => {
    const db = getFirestore(app);
    const adminCollectionRef = collection(db, 'admin');

    try {
      const querySnapshot = await getDocs(adminCollectionRef);

      let isAdmin = false;

      querySnapshot.forEach((doc) => {
        const adminData = doc.data();

        if (adminData && adminData.roles && adminData.roles.includes(uid)) {
          isAdmin = true;
          console.log('User is an admin in document:', doc.id);
        }
      });

      setIsAdmin(isAdmin);
      setLoading(false);

      if (!isAdmin) {
        console.log('User is not an admin');
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
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

 
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!isAdmin) {
    return (
      <div>
        <p>Access denied for non-admin users.</p>
      </div>
    );
  }
  

  return (
    <div>
      {!isAdmin &&  (
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
          <div className="flex justify-between text-center">
            <h1 className="mt-6 font-semibold text-3xl flex-1">Tickets</h1>
            <Link
              href="/EditTickets"
              className={`mt-6 mr-4 px-2 py-2 bg-gray-400 rounded-lg hover:bg-gray-300 flex ${
                isSidebarOpen ? "hidden md:block" : ""
              }`}
            >
              <FaEdit size={22} className="mr-1" />
              Edit Tickets
            </Link>
          </div>

          <AdminTicketsComp ticketId=""/>

          
        </div>
      </div>
      </>    
      )}   
    </div>
  );
};


export default AdminTicket;

//export default AdminTicket;

