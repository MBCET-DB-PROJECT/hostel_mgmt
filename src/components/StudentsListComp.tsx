import Sidebar from "@/components/SideBar";
import TopBar from "@/components/AdminTopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { BsPersonFillAdd } from "react-icons/bs";
import Link from "next/link";

import CreateStudent from "../pages/CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "../data/StudentDetails.json";
import EditStudents from "../pages/EditStudents/[stdId]";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
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

interface StudentDetailsProps {
  stdId: string;
}

const StdDetails: React.FC<StudentDetailsProps> = ({ stdId }) => {
  const [studentDetails, setStudentDetails] = React.useState<StudentDetails[]>(
    []
  );

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false);

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

  const [user, loading] = useState(getAuth(app)); //to check whether the student details modal is open
  const [loadingData, setLoadingData] = React.useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

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

  


  React.useEffect(() => {
    fetchStudentDetails();
  }, [stdId, user]);

  if (loadingData) {
    return <p>Loading...</p>;
  }


  return (
    <>
     
      {studentDetails.map((event, index) => (
        <StudentsCard key={index} data={event} stdId={event.stdId} />
      ))}
     
    </>
  );
};

const StudentsCard: React.FC<StudentCardProps> = ({ data, stdId }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open

  
  //dxyaaa
/*
import CreateStudent from "./../pages/CreateStudent";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import StudentData from "../data/StudentDetails.json";
import EditStudents from "./../pages/EditStudents/[id]";

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
*/
  /*
const StudentsListComp = () => {
  const students = StudentData;
  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check whether sidebar is open in responsive view
  const [isModalOpen, setModalOpen] = useState(false); //to check whether the student details modal is open
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isBlurry, setBlurry] = useState(false); //to blur background when modal is open
  const [studentsList, setStudentsList] = useState<Student[]>(StudentData); //to map student list
*/

  
  
  const handleSidebarToggle = () => {
    //handles sidebar open or not in mobile view
    setSidebarOpen(!isSidebarOpen);
  };

  const handleStudentClick = (student: any) => {
    //to select particular student to show details of in student details modal
    setSelectedStudent(student);
    setModalOpen(true);
  };



  const deleteStudent = async () => {
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
      console.log("image Url is",studentData.imageUrl)
      await deleteObject(photoRef);
    } else {
      console.error("Image URL not found for student:", studentData);
    }
  };
  
      {/*
  useEffect(() => {
    //to set background to blur when modal is open
    if (isModalOpen) {
      setBlurry(true);
    } else {
    */}

  useEffect(() => {
    //to set background to blur when modal is open
    if (isModalOpen) {
      console.log("Setting to blurry");
      setBlurry(true);
    } else {
      console.log("Setting to not blurry");

      setBlurry(false);
    }
  }, [isModalOpen]);


  return (
    <>
      {isModalOpen && selectedStudent && (
        //modal for student details
        <div className="md:w-1/6  md:block shadow-lg">
          
        {/*
        const deleteStudent = (id: number) => {
    //to map the deleted students
    const updatedList = studentsList.filter((student) => student.id !== id);
    setStudentsList(updatedList);
  };
  return (
    <div>
      {isModalOpen && selectedStudent && (
        //modal for student details
        <div className="md:w-1/6 md:block shadow-lg">
        */}

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

              <div className="mt-6">
                <Link
                  href={`/EditStudents/[stdId]`}
                  as={`/EditStudents/${stdId}`}

                /*
              <p className="mt-4">Name: {selectedStudent.name}</p>
              <p>Class: {selectedStudent.class}</p>
              <p>Sem: {selectedStudent.sem}</p>
              <p>Room: {selectedStudent.roomno}</p>
             
              <div className="mt-6">
                <Link
                  href={`/EditStudents/${selectedStudent.id}`}
                */ 

                  className="mr-4 text-white py-2 px-2 bg-blue-500 rounded-md hover:bg-blue-400"
                >
                  Edit
                </Link>

                <button
                  className="text-white py-2 px-2 bg-red-500 rounded-md hover:bg-red-400"
                  onClick={(e) => {
                    console.log("delete clicked");

                    deleteStudent();

             //       deleteStudent(selectedStudent.id);

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
          <div key={data.stdId} onClick={() => handleStudentClick(data)}>
            <form>
              <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                <div className="px-5 pb-5 w-full">
                 
                  <div className="flex  justify-between py-2">
                    
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
      
    </>
  );
};

export default StdDetails;

        {/* 
        <div className={`${isBlurry ? "blur" : ""}`}>
        <div className="flex bg-slate-200">
          <div className="m-auto w-full">
            {studentsList.map((student) => (
              <div key={student.id} onClick={() => handleStudentClick(student)}>
                <form>
                  <div className="mt-5 bg-white rounded-md shadow-lg mx-4 text-center items-center">
                    <div className="px-5 pb-5 w-full">
                      <div className="flex justify-between py-2">
                        <div>{student.name}</div>
                        <div className="flex right-0 w-1/4 justify-between">
                          <div className="hidden md:block">
                            Class:{student.class}
                          </div>
                          <div className="hidden md:block">
                            Sem:{student.sem}
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
    </div>
  );
};

export default StudentsListComp;
*/}

