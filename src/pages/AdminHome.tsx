import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import AdminHomeComp from "@/components/AdminHomeComp";
import { useAuthState } from "react-firebase-hooks/auth";
import app, { auth } from "@/app/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
interface SidebarProps {
  isOpen: boolean;
}
const AdminHome: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user,loading] = useAuthState(auth)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  //function to handle user button click

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const checkAdminStatus = async (uid: string) => {
      const db = getFirestore(app);
      const adminCollectionRef = collection(db, 'admin');
  
      try {
        const querySnapshot = await getDocs(adminCollectionRef);
  
        let isAdmin = false;
  
        querySnapshot.forEach((doc) => {
          const adminData = doc.data();
  
          if (adminData && adminData.roles && adminData.roles.includes(uid)) {
            isAdmin = true;
            console.log('User is an admin in document:', doc.id);
          }
        });
  
        setIsAdmin(isAdmin);
        setLoading(false);
  
        if (!isAdmin) {
          console.log('User is not an admin');
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setIsAdmin(false);
        setLoading(false);
      }
    };
  
    if (user) {
      checkAdminStatus(user.uid);
    } else {
      setLoading(false);
    }
  }, [user]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div>
        <p>Access denied for non-admin users.</p>
      </div>
    );
  }

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
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full ">
          <AdminHomeComp />
        </div>
      </div>
      </>
     )}
    </div>
  );
};

export default AdminHome;