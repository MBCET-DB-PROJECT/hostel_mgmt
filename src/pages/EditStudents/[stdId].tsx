import { useRouter } from "next/router";
import studentdata from "../../data/StudentDetails.json";
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
import StudentsList from "../../components/StudentsListComp";
import Toast from "@/components/Toast";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import app from "@/app/firebase";
import { createUserWithEmailAndPassword, getAuth, updateCurrentUser } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


interface StudentDetails {
  
  name: string;
  email: string;
  password: string;
  stdclass: string;
  semester: string;
  roomno: string;
  photo: File | null;
  feespaid: boolean;
  imageUrl:string;
  role: string;
}



const EditStudent: React.FC = () => {
  const [formData, setFormData] = useState<StudentDetails>({
    
    name: "",
    email: "",
    password: "",
    stdclass : "",
    semester: "",
    roomno: "",
    imageUrl:"",
    photo: null,
    
    feespaid: false,
    role: "student",
  });
 
  const [image, setImage] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showEmailToast, setShowEmailToast] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const router = useRouter();
  const { stdId } = router.query;
  const [postDetails,setPostDetails] = useState<StudentDetails | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchPostDataFromFirestore = async (
    stdId : string,
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
  } 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (stdId === undefined) {
          console.error("Post ID not provided in router query", router.query);
          return;
        }
  
        const fetchedStudentData = await fetchPostDataFromFirestore(
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
          });
  
          setIsChecked(fetchedStudentData.feespaid);

          // Handle the image separately if available
          if (fetchedStudentData.imageUrl) {
            setImage(fetchedStudentData.imageUrl);
          }

          setPostDetails(fetchedStudentData);
        } else {
          console.log("Student details not found");
        }
      } catch (error) {
        console.error("Error fetching student details", error);
      }
    };
  
    fetchData();
  }, [stdId, router.query]);
  

  // Show a loading state until the stdId becomes available
  if (stdId === undefined || postDetails === null) {
    return <div>Loading...</div>;
  }





  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  try {
  } catch (error) {}


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth(app);
    const { name, email, password, roomno, stdclass,semester, feespaid, role, photo } = formData;

    try {
    

      const db = getFirestore(app);
      const storage = getStorage(app);
      const { stdId } = router.query;

      if (photo) {
        const imageRef = ref(storage, `images/${formData.photo?.name}`);
        await uploadBytes(imageRef, photo);
        const imageUrl = await getDownloadURL(imageRef);
        console.log("Image uploaded:", imageUrl);
        if(typeof stdId === 'string') {
        const studentDocRef = doc(db, "student", stdId);
        const studentData = {
          name: formData.name,
          roomno: formData.roomno,
          stdclass: formData.stdclass,
          semester: formData.semester,
          feespaid: formData.feespaid,
          imageUrl,
          role: formData.role,
        };
      
        await updateDoc(studentDocRef, studentData);
        console.log("Student details updated successfully");
      } else {
        console.error("No photo selected");
      }
    } else {
      console.error("Invalid student ID");
    }

    

      setFormData({
        name: "",
        email: "",
        password: "",
        stdclass: "",
        semester: "",
        roomno: "",
        feespaid: false,
        photo: null,
        imageUrl:"",
        role: "student",
      });
    } catch (error: any) {
      console.error("error creating user", error.code, error.message);
    }
  };

 
  const handleCreateClick = () => {
    setShowUpdateToast(true);
  };


  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      feespaid: e.target.checked,
    }));
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
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                        required
                      />
                      <input
                         placeholder="Email"
                         type="text"
                         id="email"
                         name="email"
                         onChange={handleChange}
                         value={formData.email}
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                     
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
                        type="text"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current"
                        
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
                         type="text"
                         id="class"
                         name="stdclass"
                         onChange={handleChange}
                         value={formData.stdclass}
                          className=" text-black placeholder-gray-500 md:w-2/5 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                        <input
                          type="text"
                          id="roomno"
                          name="roomno"
                          onChange={handleChange}
                          value={formData.roomno}
                          className=" text-black placeholder-gray-500 md:w-2/5 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                      </div>
                      <div className="md:flex md:flex-row md:justify-between">
                        {" "}
                        <input
                          placeholder=""
                          type="text"
                          id="semester"
                          name="semester"
                          onChange={handleChange}
                          value={formData.semester}
                          className=" text-black placeholder-gray-500 md:w-2/5 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                        <div className="bg-gray-200 rounded-lg md:w-2/5 w-full px-4 py-2.5 mt-2 text-base flex ">
                          <input
                           type="checkbox"
                           checked={isChecked}
                           onChange={handleCheck}
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
