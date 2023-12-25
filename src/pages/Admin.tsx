import React from "react";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import AdminHome from "./AdminHome";
//import Sidebar from "@/components/SideBar";
const Admin = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //function to handle user button click

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div>
        <AdminHome isOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default Admin;
