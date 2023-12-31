import { useRouter } from "next/router";
import studentdata from "./../../data/StudentDetails.json";
import "tailwindcss/tailwind.css";
import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
//import { showToast } from "@/components/Toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import StudentsList from "../StudentsList";
import Toast from "@/components/Toast";

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

const EditStudent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<Student | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showEmailToast, setShowEmailToast] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  useEffect(() => {
    if (id) {
      const selectedStudent = studentdata.find(
        (s: any) => s.id === parseInt(id as string)
      );
      if (!selectedStudent) {
        console.error("Student not found");
        return;
      }
      setStudent(selectedStudent);
    }
  }, [id]);

  if (!id || !student) {
    return <div>Loading...</div>;
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle image upload logic here
    console.log("Image uploaded:", image);
    // showToast("submitted successfully", "success");
  };
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleEmailClick = () => {
    setShowEmailToast(true);
  };
  const handleUpdateClick = () => {
    setShowUpdateToast(true);
  };
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
        <div className="md:block md:w-5/6 bg-gray-100 h-screen w-full ">
          <div className="flex justify-between text-center">
            <h1 className=" mt-6 font-semibold text-3xl flex-1 ">
              Edit Student Details
            </h1>
            <Link
              href="/StudentsList"
              className=" hidden md:block mt-6 mr-5 px-3 py-2 bg-black text-white rounded-lg md:flex hover:bg-gray-800"
            >
              <IoMdArrowRoundBack size={24} />
              <p className="ml-2">Back</p>
            </Link>
          </div>
          <div className="flex bg-gray-100">
            <div className="m-auto">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mt-5 bg-white rounded-lg shadow-lg mx-4">
                    <div className="flex">
                      <div className="flex-1 py-5 pl-5  overflow-hidden">
                        <h1 className="inline text-2xl font-semibold leading-none">
                          Edit Student Account
                        </h1>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <input
                        placeholder="Name"
                        value={student.name}
                        onChange={(e) =>
                          setStudent((prevState: Student | null) => ({
                            ...prevState!,
                            name: e.target.value,
                          }))
                        }
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                        required
                      />
                      <input
                        placeholder="Email"
                        value={student.email}
                        type="email"
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                        required
                        onClick={handleEmailClick}
                      />
                      {showEmailToast && (
                        <Toast
                          message="Email cannot be changed."
                          type="success"
                          onClose={() => setShowEmailToast(false)}
                        />
                      )}
                      <input
                        placeholder="Password"
                        type="password"
                        value={student.password}
                        onChange={(e) =>
                          setStudent((prevState: Student | null) => ({
                            ...prevState!,
                            password: e.target.value,
                          }))
                        }
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current"
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="mt-5 bg-white rounded-lg shadow-lg mx-4 mb-5">
                    <div className="flex">
                      <div className="flex-1 py-5 pl-5  overflow-hidden">
                        <h1 className="inline text-2xl font-semibold leading-none">
                          Additional Details
                        </h1>
                      </div>
                    </div>
                    <div className="px-5 pb-5 flex flex-col">
                      <div className="md:flex md:flex-row md:justify-between">
                        {" "}
                        <input
                          placeholder="Class (Eg:CS2)"
                          value={student.class}
                          onChange={(e) =>
                            setStudent((prevState: Student | null) => ({
                              ...prevState!,
                              class: e.target.value,
                            }))
                          }
                          className=" text-black placeholder-gray-500 md:w-2/5 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                        <input
                          placeholder="Assign Room (Eg:302)"
                          value={student.roomno}
                          onChange={(e) =>
                            setStudent((prevState: Student | null) => ({
                              ...prevState!,
                              roomno: e.target.value,
                            }))
                          }
                          className=" text-black placeholder-gray-500 md:w-2/5 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                      </div>
                      <div className="md:flex md:flex-row md:justify-between">
                        {" "}
                        <input
                          placeholder="Semester (Eg:S6)"
                          value={student.sem}
                          onChange={(e) =>
                            setStudent((prevState: Student | null) => ({
                              ...prevState!,
                              sem: e.target.value,
                            }))
                          }
                          className=" text-black placeholder-gray-500 md:w-2/5 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                        <div className="bg-gray-200 rounded-lg md:w-2/5 w-full px-4 py-2.5 mt-2 text-base flex ">
                          <input
                            type="checkbox"
                            className="w-6 h-6 text-black text-sm bg-transparent border-none rounded-md focus:ring-transparent  accent-black"
                          />
                          <label className="block ml-2 text-sm text-gray-900 font-semibold">
                            Fees Paid
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4 px-4 py-2.5">
                      <div className="w-full max-w-md">
                        <label
                          htmlFor="imageInput"
                          className="block text-lg font-medium mb-2"
                        >
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full p-2 border border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                      {image && (
                        <div className="mt-4">
                          <img
                            src={image}
                            alt="Uploaded Preview"
                            className="w-64 h-64 object-cover rounded"
                          />
                        </div>
                      )}
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-5 "
                        onClick={handleUpdateClick}
                      >
                        <div className="flex ">
                          {" "}
                          <div className="mr-2 mt-0.5">
                            <FaPlus size={18} />
                          </div>
                          <div>Update</div>
                        </div>
                      </button>
                      {showUpdateToast && (
                        <Toast
                          message="Details updated successfully."
                          type="success"
                          onClose={() => setShowUpdateToast(false)}
                        />
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
