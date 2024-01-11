"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateStudent from "@/pages/CreateStudent";
import TopBar from "@/components/AdminTopBar";
import Sidebar from "@/components/SideBar";

import AdminHome from "@/pages/AdminHome";
//import { showToast } from "@/components/Toast";
const DfltPage = () => {
  return (
    <div>
      <AdminHome />
      <ToastContainer />
    </div>
  );
};
export default DfltPage;
