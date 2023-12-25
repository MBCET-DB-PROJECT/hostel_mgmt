import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";
import CreateStudent from "./CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "./../data/StudentDetails.json";
import EditStudents from "./EditStudents/[stdId]";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import router from "next/router";

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
  role: string;
}

interface StudentDetailsProps {
  cardId: string;
}

const StdDetails: React.FC<StudentDetailsProps> = ({ cardId }) => {
  const [studentDetails, setStudentDetails] = React.useState<StudentDetails[]>(
    []
  );

  const [user, loading] = useState(getAuth(app)); //to check whether the student details modal is open
  const [loadingData, setLoadingData] = React.useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const fetchStudentDetails = async () => {
    const db = getFirestore(app);
    const studentsRef = collection(db, "student");

    const studentsSnaphot = await getDocs(studentsRef);

    const studentPromises = studentsSnaphot.docs.map(async (userDoc) => {
      if (!studentsSnaphot.empty) {
        const studId = userDoc.id;
        const studentPosts: StudentDetails[] = studentsSnaphot.docs.map(
          (userDoc) => {
            const studData = userDoc.data() as StudentDetails;
            return { ...studData };
          }
        );
        return studentPosts;
      }
      return [];
    });
    const allPosts = await Promise.all(studentPromises);
    const flattenedPosts = allPosts.flat();

    if (flattenedPosts.length > 0) {
      console.log("Posts loaded:", flattenedPosts);
      setStudentDetails(flattenedPosts);
    } else {
      console.log("No posts found");
    }

    setLoadingData(false);
  };
  React.useEffect(() => {
    fetchStudentDetails();
  }, [cardId, user]);

  return (
    <div className="grid grid-cols-3 gap-3 ml-5">
      {studentDetails.map((event, index) => (
        <StudentsList key={index} data={event} stdId={event.stdId} />
      ))}
    </div>
  );
};

const StudentsList: React.FC<StudentCardProps> = ({ data, stdId }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open
  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };

  const handleStudentClick = (student: any) => {
    //to select particular student to show details of in student details modal
    setSelectedStudent(student);
    setModalOpen(true);
  };

  useEffect(() => {
    //to set background to blur when modal is open
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);
  /*
   const deleteStudent = (id: number) => {
     //to map the deleted students
     const updatedList = studentsList.filter((student) => student.id !== id);
     setStudentsList(updatedList);
   };
 */

  return (
    <>
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
                <p className="mt-4">Name: {data.name}</p>
                <p>Class: {data.stdclass}</p>
                <p>Sem: {data.semester}</p>
                <p>Room: {data.roomno}</p>
                {/* ... other details */}
                <div className="mt-6">
                  <Link
                    href={`/EditStudents/${data.stdId}`}
                    className="mr-4 text-white py-2 px-2 bg-blue-500 rounded-md hover:bg-blue-400"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={` ${isBlurry ? "blur" : ""}`}>
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
                <h1 className=" mt-6 font-semibold text-3xl flex-1">
                  Students List
                </h1>
                <Link
                  href="/CreateStudent"
                  className={`mt-6 mr-4 px-1 py-1 bg-gray-400 rounded-lg ${
                    isSidebarOpen ? "hidden md:block" : ""
                  }`}
                >
                  <BsPersonFillAdd size={32} />
                </Link>
              </div>

              <div className="flex bg-gray-100">
                <div className={`m-auto w-full ${isBlurry ? "blur" : ""}`}>
                  <div
                    key={data.stdId}
                    onClick={() => handleStudentClick(data)}
                  >
                    <form>
                      <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                        <div className="px-5 pb-5 w-full">
                          <div className="flex justify-between py-2">
                            <div>{data.name}</div>
                            <div className="flex right-0 w-1/4 justify-between">
                              <div className="hidden md:block">
                                Class:{data.stdclass}
                              </div>
                              <div className="hidden md:block">
                                Sem:{data.semester}
                              </div>
                              <div
                                className={`flex ${
                                  isSidebarOpen ? "hidden md:block" : ""
                                }`}
                              >
                                Room:{data.roomno}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StdDetails;
