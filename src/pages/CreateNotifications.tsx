import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Toast from "@/components/Toast";
import { useEffect } from "react";
import NotifData from "../data/Notifications.json";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import AdminNotifications from "./AdminNotifications";

interface SidebarProps {
  isOpen: boolean;
}
interface Notification {
  nid: number;
  content: string;
  date: string;
}
import { MdAdd } from "react-icons/md";
const CreateNotifications: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState<string>("");
  const [nid, setNid] = useState<number>(1);
  const [showToast, setShowToast] = useState(false);
  const [newNotification, setNewNotification] = useState<Notification | null>(
    null
  );

  /*useEffect(() => {
    // Find the highest nid from the JSON file
    const maxNid = Math.max(
      ...NotifData.map((notif: Notification) => notif.nid),
      0
    );
  }, []);*/
  const maxNid = Math.max(
    ...NotifData.map((notif: Notification) => notif.nid),
    0
  );
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationContent(event.target.value);
  };

  const handleCreateNotification = () => {
    const notification = {
      nid: maxNid + 1,
      content: notificationContent,
      date: new Date().toLocaleDateString(),
    };
    setNewNotification(notification); //newNotification state for toast
    setShowToast(true);
    NotifData.push(notification);
    setNid((prevNid) => prevNid + 1);
    console.log(notification);
    setNotificationContent("");
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide the toast after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div>
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
          <div className=" mt-6 flex justify-center items-center text-center">
            <div className="px-1 container mx-auto mt-10 ">
              <div className=" flex justify-between">
                <h1 className="text-3xl font-semibold mb-4 flex-1">
                  Create New Notification
                </h1>
                <Link
                  href="/AdminNotifications"
                  className="bg-black hover:bg-gray-800 text-white font-bold px-2 py-1 rounded flex mr-2 mt-2"
                >
                  <IoMdArrowRoundBack size={20} className="mt-1 mr-2" /> Back
                </Link>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-md font-semibold mb-5"
                  htmlFor="notificationContent"
                >
                  Enter new notification :
                </label>
                <input
                  type="text"
                  id="notificationContent"
                  placeholder="Enter notification content..."
                  value={notificationContent}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-2/3 md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                onClick={handleCreateNotification}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-3"
              >
                Create
              </button>
              {showToast && newNotification && (
                <Toast
                  message={`Successfully created - nid: ${
                    maxNid + 1
                  },content: ${
                    newNotification.content
                  }, date: ${new Date().toLocaleDateString()}`}
                  type="success"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotifications;
