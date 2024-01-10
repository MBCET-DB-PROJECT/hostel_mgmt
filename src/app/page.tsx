"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateStudent from "@/pages/CreateStudent";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/SideBar";
import Landing from "@/pages/Landing";
import AdminHome from "@/pages/AdminHome";
//import { showToast } from "@/components/Toast";
const DfltPage = () => {
  return (
    <div>
      <Landing />
      <ToastContainer />
    </div>
  );
};
export default DfltPage;
