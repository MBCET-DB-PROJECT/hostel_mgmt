"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateStudent from "@/pages/Admin/CreateStudent";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/SideBar";
import Admin from "@/pages/Admin/Admin";
import AdminHome from "@/pages/Admin/AdminHome";
//import { showToast } from "@/components/Toast";
const DfltPage = () => {
  return (
    <div>
      <Admin />
      <ToastContainer />
    </div>
  );
};
export default DfltPage;
