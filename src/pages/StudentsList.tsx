import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import StdDetails from "@/components/StudentsListComp";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface SidebarProps {
  isOpen: boolean;
}
const StudentsList: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //function to handle user button click
  const auth = getAuth(app);
  const [user,loading] = useAuthState(auth)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

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


  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
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
      <TopBar onSidebarToggle={handleSidebarToggle} />
      <div className="flex">
        <div
          className={`md:block md:w-1/6 bg-white h-screen shadow-lg ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:block md:w-5/6 bg-gray-200 h-screen w-full ">
          <StdDetails stdId="">
          </StdDetails>
        </div>
      </div>
      </>
     )}
    </div>
  );
};

export default StudentsList;
