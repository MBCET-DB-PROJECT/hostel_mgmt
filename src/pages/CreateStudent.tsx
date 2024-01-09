import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import app, { auth } from "@/app/firebase";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
//import { showToast } from "@/components/Toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/components/Toast";
import "./../app/globals.css";

import { collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
  role: string;
}

interface User {
  role: string;
}

/*import CreateStudentComp from "@/components/CreateStudentComp";

//import { useEffect } from "react";
        */


const CreateStudent: React.FC = () => {
  const [formData, setFormData] = useState<StudentDetails>({
    name: "",
    email: "",
    password: "",
    stdclass : "",
    semester: "",
    roomno: "",
    photo: null,
    feespaid: false,
    role: "student",
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false); //to check sidebar open or not in mobile view
  const [showCreateToast, setShowCreateToast] = useState(false); //to show user created toast
  const [image, setImage] = useState<string | null>(null); //used for image insertion and preview

  const [error, setError] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
 
  const auth = getAuth(app);
  const [user,loading] = useAuthState(auth)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);


  const oldUser = auth.currentUser;

  useEffect(() => {
    
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const db = getFirestore(app);
        const adminCollectionRef = collection(db, 'admin');
  
        console.log('User UID:', currentUser.uid);
  
        try {
          const querySnapshot = await getDocs(adminCollectionRef);
    
          querySnapshot.forEach((doc) => {
            const adminData = doc.data();
            
            if (adminData && adminData.role && adminData.role.includes(currentUser.uid)) {
              setIsAdmin(true);
              setLoading(false);
              console.log('User is an admin');
              // If you want to break out of the loop when an admin is found, you can use 'return;'
            } else {
              setIsAdmin(false);
              setLoading(false);
              console.log('User is not an admin');
            }
          });
        } catch (error) {
          console.error('Error fetching admin data:', error);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };
  
    fetchUserData();
  }, [user]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    {/* const [isScrollDisabled, setScrollDisabled] = useState(false); */}


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

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      feespaid: e.target.checked,
    }));
  };
  //handles the submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAdmin) {
      console.log("Access denied for non-admin users.");
      return;
    }    


    const auth = getAuth(app);
    const { name, email, password, roomno, stdclass,semester, feespaid, role, photo } = formData;

    try {
   
     const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const student = userCredential.user;

      const db = getFirestore(app);
      const storage = getStorage(app);

      if (photo) {
        const imageRef = ref(storage, `images/${formData.photo?.name}`);
        await uploadBytes(imageRef, photo);
        const imageUrl = await getDownloadURL(imageRef);
        console.log("Image uploaded:", imageUrl);

        const studentDocRef = doc(db, "student", student.uid);
        const studentData = {
          name,
          roomno,
          stdclass,
          semester,
          feespaid,
          imageUrl,
          role
        };

        await setDoc(studentDocRef, studentData);
      } else {
        console.error("No photo selected");
      }

      console.log("user created");
      

      console.log("Student id",student.uid);
      

      setFormData({
        name: "",
        email: "",
        password: "",
        stdclass: "",
        semester: "",
        roomno: "",
        feespaid: false,
        photo: null,
        role: "student",
      });

      updateCurrentUser(auth, oldUser);
      

    } catch (error: any) {
      console.error("error creating user", error.code, error.message);
    }
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

    <div>
   {!isAdmin && (
      <div>
        <p>Access denied for non-admin users.</p>
        {/* You can add more UI elements or a redirect logic here */}
      </div>
    )}
    {isAdmin && (

   <>

          {/*  <div style={{ maxHeight: "100vh", overflow: "hidden" }}> */}

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
            {/*<div className="flex bg-slate-200">

            <div className="m-auto">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mt-5 bg-white rounded-lg shadow-lg mx-4">
                    <div className="flex">
                      <div className="flex-1 py-5 pl-5  overflow-hidden">
                        <h1 className="inline text-2xl font-semibold leading-none">
                          Create Student Account
                        </h1>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
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
                        required
                      />
                      <input
                        placeholder="Password"
                        type="text"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
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
                          type="text"
                          id="class"
                          name="stdclass"
                          onChange={handleChange}
                          value={formData.stdclass}
                          className=" text-black placeholder-gray-500 md:w-2/5 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                        <input
                          placeholder="Assign Room (Eg:302)"
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
                          placeholder="Semester (Eg:S6)"
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
                          className="w-full p-2  border-2 border-gray-300 rounded-lg"
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
                        onClick={handleCreateClick}
                      >
                        <div className="flex ">
                          {" "}
                          <div className="mr-2 mt-0.5">
                            <FaPlus size={18} />
                          </div>
                          <div>Add</div>
                        </div>
                      </button>
                      {showCreateToast && (
                        <Toast
                          message="Details updated successfully."
                          type="success"
                          onClose={() => setShowCreateToast(false)}
                        />
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
                      </div>*/}
          </div>
        </div>
      </div>
      </>
       )}
    </div>
  );
};

export default CreateStudent;
