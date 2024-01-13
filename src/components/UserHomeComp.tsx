import React, { ChangeEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import Toast from "./Toast";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import studentData from "./../data/StudentDetails.json";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import app, { auth } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface StudentDetails {
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
  stdphn: number;
  address: string;
  guardian: string;
  grdphn: number;
}



const UserHomeComp: React.FC = () => {
  const [formData, setFormData] = useState<StudentDetails>({
    name: "",
    email: "",
    password: "",
    stdclass: "",
    semester: "",
    roomno: "",
    imageUrl: "",
    photo: null,
    feespaid: false,
    role: "student",
    stdphn: 0,
    address: "",
    guardian: "",
    grdphn: 0,
  });

  const student = studentData[0];
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showEditToast, setShowEditToast] = useState(false);
  const [studentDetails,setStudentDetails] = useState<StudentDetails | null>(null);
  const [isBlurry, setBlurry] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [user] = useAuthState(auth);
  const stdId = user ? user.uid : undefined;

  const [editedStudent, setEditedStudent] = useState({
    ...student, // Ensure it's a string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Update student data in the JSON file or database
    // For now, just updating the state
    setModalOpen(false);
    setShowEditToast(true);
    setEditedStudent(editedStudent);
  };

  const fetchStudDataFromFirestore = async (
    stdId: string
  ): Promise<StudentDetails | null> => {
    try {

      const db = getFirestore(app);
      const studentRef = doc(db,`student/${stdId}`);
      const studentsSnaphot = await getDoc(studentRef);

      
      if(studentsSnaphot.exists()) {
        const fetchStudentData = studentsSnaphot.data() as StudentDetails;
        return fetchStudentData;  
       } else {
        console.log("Post not found");
        return null;
       } 
    } catch (error) {
      console.error("Error fetching post data:",error);

      return null;
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (stdId === undefined) {
          console.error("Srudent doesnt exist", stdId);
          return;
        }
  
        const fetchedStudentData = await fetchStudDataFromFirestore(
          stdId as string
        );
  
        if (fetchedStudentData) {
          // Set the initial form data with the existing student details
          setFormData({
            name: fetchedStudentData.name,
            email: fetchedStudentData.email,
            password: fetchedStudentData.password,
            stdclass: fetchedStudentData.stdclass,
            semester: fetchedStudentData.semester,
            roomno: fetchedStudentData.roomno,
            imageUrl: fetchedStudentData.imageUrl,
            photo: null, // You may need to handle the photo separately if needed
            feespaid: fetchedStudentData.feespaid,
            role: fetchedStudentData.role,
            stdphn: fetchedStudentData.stdphn,
            address: fetchedStudentData.address,
            guardian:fetchedStudentData.guardian,
            grdphn:fetchedStudentData.grdphn
          });
  
          setIsChecked(fetchedStudentData.feespaid);

          // Handle the image separately if available
          if (fetchedStudentData.imageUrl) {
            setImage(fetchedStudentData.imageUrl);
          }

          setStudentDetails(fetchedStudentData);
        } else {
          console.log("Student details not found");
        }
      } catch (error) {
        console.error("Error fetching student details", error);
      }
    };
  
    fetchData();
  }, [stdId]);


  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      feespaid: e.target.checked,
    }));
  };


   
  useEffect(() => {
    if (isModalOpen) {
      setBlurry(true);
    } else {
      setBlurry(false);
    }
  }, [isModalOpen]);

  if (stdId === undefined || studentDetails === null) {
    return <div>Loading...</div>;
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { name, email, password, roomno, stdclass, semester, feespaid, role, photo,stdphn,address,guardian,grdphn } = formData;
    e.preventDefault ();
    try {
      const db = getFirestore(app);

      const studentDocRef = doc(db,"student",stdId);

      const studentData = {
        stdphn: stdphn,
        address: address,
        guardian:guardian,
        grdphn:grdphn
      };

      await updateDoc(studentDocRef,studentData);
     
      console.log("Student details updated successfully");
      window.location.reload();
      
    } catch(error:any) {
      console.error("Error updating student details", error.code, error.message);
    }
  }


  return (
    <div className="w-full flex justify-center ">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg md:w-1/3 w-full mx-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ">Edit Details</h2>
              <button onClick={() => setModalOpen(false)}>
                <IoClose size={26} className="hover:bg-red-300 rounded-md" />
              </button>
            </div>
            <form onSubmit = {handleSubmit}>
            <div className="flex justify-center flex-col p-5  space-y-3 mt-2">
              
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Students Phone : </p>
                <p className="ml-4">
                  {" "}
                  <input
                   type="number"  // Change type to "number"
                   name="grdphn"
                   onChange={handleChange}
                   value={formData?.grdphn?.toString() || ""}
                    
                  />
                  {/*ignore the error above,the thingy works fine...until it doesnt but anyways,...build error here*/}
                </p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Address : </p>
                <p className="ml-4">
                  <input
                    type="text"
                    name ="address"
                    onChange={handleChange}
                    value={formData?.address || ''}
                   
                  />
                </p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Local Guardian : </p>
                <p className="ml-4">
                  <input
                    type="text"
                    name="guardian"
                    onChange={handleChange}
                    value={formData.guardian || ''}
                    
                  />
                </p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Phone : </p>
                <p className="ml-4">
                  <input
                     type="number"  // Change type to "number"
                     name="stdphn"
                     onChange={handleChange}
                     value={formData?.stdphn?.toString() || ""}
                   
                  />
                </p>
              </div>
            </div>
           
            <button
              type="submit"
             
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-400"
            >
              Save
            </button>
            </form>
          </div>
        </div>
      )}{" "}
      {showEditToast && (
        <>
          <Toast
            message="Details updated successfully."
            type="success"
            onClose={() => setShowEditToast(false)}
          />
        </>
      )}
      <div
        className={`flex flex-col justify-center space-y-10 md:p-10 p-5 w-full  ${
          isBlurry ? "blur" : ""
        }`}
      >
        <div className="font-semibold text-3xl">
          Welcome&nbsp;back&nbsp;{formData.name}!
        </div>
        <div className="flex md:flex-row flex-col md:justify-around w-full  md:space-x-10 space-y-10 md:space-y-0 ">
          <div className="w-full md:w-1/2 h-64 md:h-64 shadow-lg bg-gradient-to-b from-blue-600 to-slate-300  rounded-3xl transition-transform duration-300 hover:scale-105">
            <div className="flex justify-between h-full m-2  ">
              <div className="w-1/2  h-full rounded-md flex justify-center items-center  ">
                <img
                  src={image ?? ""}
                  alt=""
                  className="h-44 w-40 flex justify-center border border-2 p-2 border-black  rounded-lg shadow-lg"
                ></img>
              </div>
              <div className="w-1/2  h-full rounded-md flex  text-right flex-col space-y-3  p-4">
                <p className="text-7xl font-semibold">{formData.roomno}</p>
                <p className="text-3xl">{formData.name}</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-64 shadow-lg bg-gradient-to-b from-blue-600 to-slate-300 rounded-3xl relative pb-4 pl-4 transition-transform duration-300 hover:scale-105">
            <div className="absolute top-5 right-5">
              <button
                onClick={() => setModalOpen(true)}
                className=" hover:bg-white  text-black p-1  rounded-md"
              >
                {" "}
                <FaEdit size={24} />
              </button>
            </div>
            <div className="flex justify-center flex-col p-5  space-y-3 mt-10">
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Students Phone : </p>
                <p className="ml-4">{formData.stdphn}</p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className="font-semibold ">Address : </p>
                <p className="ml-4">{formData.address}o</p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Local Guardian : </p>
                <p className="ml-4">{formData.guardian}</p>
              </div>
              <div className="flex flex-row text-lg">
                {" "}
                <p className=" font-semibold">Phone : </p>
                <p className="ml-4">{formData.grdphn}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-around w-full space-y-10 md:space-y-0 bg-white rounded-3xl shadow-lg">
          <div className="w-full sm:w-1/2 md:w-1/3 p-4 ">
            <div className="bg-gradient-to-b from-blue-500 to-slate-300  rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 p-6">
              <div className="flex justify-center items-center text-center">
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <p className="text-6xl flex justify-center items-center">
                    {formData.semester}
                  </p>
                  <p className="text-base italic font-thin text-black">
                    Semester
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="bg-gradient-to-b from-blue-500 to-slate-300  rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 p-6">
              <div className="flex justify-center items-center text-center">
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <p className="text-6xl flex justify-center items-center">
                    {formData.stdclass}
                  </p>
                  <p className="text-base font-thin italic text-black">Class</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="bg-gradient-to-b from-blue-500 to-slate-300  rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 p-6">
              <div className="flex justify-center items-center text-center">
                <div className="flex flex-col space-y-2 justify-center items-center">
                  <div className="flex flex-col space-y-2 justify-center items-center">
                    <div className="text-6xl flex justify-center items-center flex-col">
                      <div>
                        <input
                          type="checkbox"
                          defaultChecked={isChecked}
                          disabled
                          className="w-14 h-14 text-black text-sm bg-transparent border-none rounded-md focus:ring-transparent  accent-black"
                        />
                      </div>
                      <div className="block  text-base italic text-black font-thin mt-1">
                        Fees
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomeComp;
