import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import CreateStudent from "../pages/CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "../data/StudentDetails.json";
import EditStudents from "../pages/EditStudents/[stdId]";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import "./../app/globals.css";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import router from "next/router";
import { deleteObject, getStorage, ref } from "firebase/storage";
import StudentsList from "@/pages/StudentsList";

interface SidebarProps {
  isOpen: boolean;
}

interface StudentCardProps {
  data: StudentDetails;

  stdId: string;
}

interface StudentDetails {
  stdId: string;
  name: string;
  email: string;
  password: string;
  stdclass: string;
  semester: string;
  roomno: string;
  photo: File | null;
  feespaid: boolean;
  imageUrl: string;
  role: string;
}

const StudentsCard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open
  const [studentDetails, setStudentDetails] = React.useState<StudentDetails[]>(
    []
  );
  const [user, loading] = useState(getAuth(app)); //to check whether the student details modal is open
  const [loadingData, setLoadingData] = React.useState(true);

  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };

  const handleStudentClick = (student: any) => {
    //to select particular student to show details of in student details modal
    setSelectedStudent(student);
    setBlurry(true);
    setModalOpen(true);
  };

  const fetchStudentDetails = async () => {
    try {
      const db = getFirestore(app);
      const studentsRef = collection(db, "student");

      const studentsSnapshot = await getDocs(studentsRef);

      const studentDetailsArray: StudentDetails[] = [];

      studentsSnapshot.forEach((studentDoc) => {
        const studentData = studentDoc.data() as StudentDetails;

        // Append the stdId to the student data
        const studentWithId = { ...studentData, stdId: studentDoc.id };

        // Add the student data to the array
        studentDetailsArray.push(studentWithId);
      });

      if (studentDetailsArray.length > 0) {
        console.log("Student details loaded:", studentDetailsArray);
        setStudentDetails(studentDetailsArray);
      } else {
        console.log("No student details found");
      }
    } catch (error) {
      console.error("Error fetching student details", error);
    } finally {
      setLoadingData(false);
    }
  };

  const deleteStudent = async (stdId: string) => {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const auth = getAuth(app);
    const studentsRef = collection(db, "student");
    const studentDoc = doc(db, "student", stdId);

    const studentSnapshot = await getDoc(studentDoc);
    const studentData = studentSnapshot.data() as StudentDetails;
    await deleteDoc(studentDoc);

    if (studentData.imageUrl) {
      const photoRef = ref(storage, studentData.imageUrl);
      console.log("image Url is", studentData.imageUrl);
      await deleteObject(photoRef);
    } else {
      console.error("Image URL not found for student:", studentData);
    }
  };

  useEffect(() => {
    // To set background to blur when modal is open
    if (isModalOpen) {
      console.log("Setting to blurry");
      setBlurry(true);
    } else {
      console.log("Setting to not blurry");
      setBlurry(false);
    }
    fetchStudentDetails();
  }, [isModalOpen]);

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

  return (
    <div>
      {isModalOpen && selectedStudent && (
        //modal for student details
        <div className="md:w-1/6 md:block shadow-lg">
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white md:p-8 p-4  rounded-lg md:w-1/2 w-2/3 shadow-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Student Details</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="hover:bg-gray-200 px-1 py-1 rounded-lg"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <p className="mt-4">Name: {selectedStudent.name}</p>
              <p>Class: {selectedStudent.stdclass}</p>
              <p>Sem: {selectedStudent.semester}</p>
              <p>Room: {selectedStudent.roomno}</p>
              {/* ... other details */}
              <div className="mt-6">
                <Link
                  href={`/EditStudents/${selectedStudent.stdId}`}
                  className="mr-4 text-white py-2 px-2 bg-blue-500 rounded-md hover:bg-blue-400"
                >
                  Edit
                </Link>
                <button
                  className="text-white py-2 px-2 bg-red-500 rounded-md hover:bg-red-400"
                  onClick={(e) => {
                    console.log("delete clicked");
                    deleteStudent(selectedStudent.stdId);
                    setModalOpen(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex bg-slate-200">
        <div className={`m-auto w-full ${isBlurry ? "blur" : ""}`}>
          {studentDetails.map((student) => (
            <div
              key={student.stdId}
              onClick={() => handleStudentClick(student)}
            >
              <form>
                <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                  <div className="px-5 pb-5 w-full">
                    <div className="flex justify-between py-2">
                      <div>{student.name}</div>
                      <div className="flex right-0 w-1/4 justify-between">
                        <div className="hidden md:block">
                          Class:{student.stdclass}
                        </div>
                        <div className="hidden md:block">
                          Sem:{student.semester}
                        </div>
                        <div
                          className={`flex ${
                            isSidebarOpen ? "hidden md:block truncate " : ""
                          }`}
                        >
                          Room:{student.roomno}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsCard;
