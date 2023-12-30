import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditTicketsComp from "@/components/EditTicketsComp";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "@/app/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

interface SidebarProps {
  isOpen: boolean;
}

interface Tickets {
  content: string;
}

interface StudentDetails {
  content: boolean;
}

const EditTickets: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [newTicket, setNewTicket] = useState("");
  const [tickets, setTickets] = useState(["Kettle", "Soap", "Towel"]);
  //function to handle user button click

  const [formData, setFormData] = useState<Tickets>({
    content: "",
  });

  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const db = getFirestore(app);
        const adminCollectionRef = collection(db, "admin");

        console.log("User UID:", currentUser.uid);

        try {
          const querySnapshot = await getDocs(adminCollectionRef);

          querySnapshot.forEach((doc) => {
            const adminData = doc.data();

            if (
              adminData &&
              adminData.role &&
              adminData.role.includes(currentUser.uid)
            ) {
              setIsAdmin(true);
              setLoading(false);
              console.log("User is an admin");
              // If you want to break out of the loop when an admin is found, you can use 'return;'
            } else {
              setIsAdmin(false);
              setLoading(false);
              console.log("User is not an admin");
            }
          });
        } catch (error) {
          console.error("Error fetching admin data:", error);
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

  const generateUniqueTicketId = (): string => {
    const ticketDocRef = doc(collection(getFirestore(app), "Tickets"));
    return ticketDocRef.id;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTicket(e.target.value);
  };
  const handleDeleteTicket = (ticketToDelete: string) => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket !== ticketToDelete
    );
    setTickets(updatedTickets);
  };

  const handleAddTicket = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { content } = formData;

    try {
      const db = getFirestore(app);

      // Generate a unique ticket ID
      const ticketDocRef = doc(collection(db, "Tickets"));

      const ticketData = {
        content,
      };

      await setDoc(ticketDocRef, ticketData);
      console.log("Tickets created successfully");

      // Update each student with the newly added ticket content as a boolean value
      const studentsRef = collection(db, "student");
      const studentsSnapshot = await getDocs(studentsRef);

      studentsSnapshot.forEach(async (studentDoc) => {
        const studentId = studentDoc.id;

        const ticketColletionRef = collection(
          db,
          "student",
          studentId,
          "tickets"
        );

        const ticketRef = await addDoc(ticketColletionRef, {
          [content]: false,
        });
      });

      setFormData({
        content: "",
      });
    } catch (error: any) {
      console.error("error creating tickets", error.code, error.message);
    }
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
        <div className="md:block md:w-5/6 bg-slate-200 h-screen w-full ">
          <h1 className="flex justify-center text-3xl font-semibold mt-4">
            Edit Tickets
          </h1>
          <h2 className="text-lg flex justify-center mt-4 font-semibold">
            Current tickets :{" "}
          </h2>
          <div className="flex flex-col  mt-4 space-y-5 justify-center items-center">
            <EditTicketsComp />
            {/*{tickets.map((ticket, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-300 text-center p-3 w-1/6 rounded-md"
              >
                <div className="flex-1">{ticket}</div>
                <button
                  onClick={() => handleDeleteTicket(ticket)}
                  className="rounded-md hover:bg-red-300 p-1"
                >
                  <MdDelete size={18} />
                </button>
              </div>
           ))}*/}
            <form onSubmit={handleAddTicket}>
              <div className="flex justify-center items-center w-1/6">
                <input
                  type="text"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter new ticket"
                  className="p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="ml-2 p-2 bg-gray-300 rounded-md font-semibold hover:bg-gray-400 flex"
              >
                <FaPlus className="mr-2 mt-1" /> Add
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
       )}
    </div>
  );
};

export default EditTickets;
