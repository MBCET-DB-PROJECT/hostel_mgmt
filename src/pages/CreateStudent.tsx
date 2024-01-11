import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState, ChangeEvent, FormEvent } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
//import { showToast } from "@/components/Toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/components/Toast";
import CreateStudentComp from "@/components/CreateStudentComp";
import "./../app/globals.css";
import { useEffect } from "react";

const CreateStudent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check sidebar open or not in mobile view
  const [showCreateToast, setShowCreateToast] = useState(false); //to show user created toast
  const [image, setImage] = useState<string | null>(null); //used for image insertion and preview
  const [isScrollDisabled, setScrollDisabled] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    //to handle image insertion and preview
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    //useless funtion to debug
    e.preventDefault();
    console.log("Image uploaded:", image);
  };

  const handleSidebarToggle = () => {
    //handles sidebar
    setSidebarOpen(!isSidebarOpen);
  };
  const handleCreateClick = () => {
    setShowCreateToast(true);
  };
  useEffect(() => {
    if (isScrollDisabled) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isScrollDisabled]);

  return (
    <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
      <TopBar onSidebarToggle={handleSidebarToggle} />
      <div className="flex">
        <div
          className={`md:block md:w-1/6 bg-white h-screen shadow-lg ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div
          className={`md:block md:w-5/6 bg-slate-200 h-screen w-full ${
            isScrollDisabled ? "overflow-y-auto" : ""
          }`}
          //style={{ maxHeight: "calc(100vh - 60px)" }}
        >
          <div className="flex justify-center text-center">
            <h1 className=" mt-6 font-semibold text-3xl">Add Students</h1>
          </div>
          {/* Apply .no-scroll class conditionally */}
          <div className={isScrollDisabled ? "no-scroll" : ""}>
            <CreateStudentComp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
