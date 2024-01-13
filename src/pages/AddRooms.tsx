import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

interface SidebarProps {
  isOpen: boolean;
}

interface RoomDetails {
  roomno: string;
  isOccupied: boolean;
}

let calculatedTotalRooms: number | undefined;

const AddRooms: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [minRoom, setMinRoom] = useState<number | undefined>(undefined);
  const [maxRoom, setMaxRoom] = useState<number | undefined>(undefined);
  const [maxStudents, setMaxStudents] = useState<number | undefined>(undefined);
  const [totalRooms, setTotalRooms] = useState<number | undefined>(undefined);

  // Function to handle user button click
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validation for positive values and maxRoom > minRoom
    if (
      minRoom === undefined ||
      maxRoom === undefined ||
      maxStudents === undefined
    ) {
      alert("Please fill in all the fields correctly");
      return;
    }

    if (minRoom <= 0 || maxRoom <= 0 || maxStudents <= 0) {
      console.error("All values must be positive");
      return;
    }

    if (maxRoom < minRoom) {
      console.error("Max room should be greater than or equal to min room");
      return;
    }

    
    calculatedTotalRooms = maxRoom - minRoom + 1;
    setTotalRooms(calculatedTotalRooms);

    // Continue with the submission logic
    console.log("submitted");
  };

  return (
    <div>
      <TopBar onSidebarToggle={handleSidebarToggle} />
      <div className="flex flex-col md:flex-row">
        <div
          className={`md:w-1/6 bg-white h-screen shadow-lg ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="md:w-5/6 bg-slate-200 w-full h-full p-4 md:mx-auto"
        >
          <div className="flex flex-col gap-5 items-center justify-center h-full">
            <div className="flex flex-col md:flex-row border rounded-md p-7 bg-slate-600 gap-9">
              <div className="flex gap-5 flex-col md:w-1/2">
                <label className="text-2xl">Enter minimum room no </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={minRoom !== undefined ? minRoom : ""}
                  pattern="\d*"
                  className="h-16 md:h-48 text-2xl md:text-5xl text-center border rounded-md px-3"
                  onChange={(e) => setMinRoom(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="flex gap-5 flex-col md:w-1/2">
                <label className="text-2xl">Enter maximum room no </label>
                <input
                  type="text"
                  pattern="\d*"
                  value={maxRoom !== undefined ? maxRoom : ""}
                  inputMode="numeric"
                  className="h-16 md:h-48 text-2xl md:text-5xl text-center border rounded-md px-3"
                  onChange={(e) => setMaxRoom(parseInt(e.target.value, 10))}
                />
              </div>
            </div>
            <div className="mt-4">Total Rooms: {totalRooms}</div>

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRooms;

export { calculatedTotalRooms as totalRooms };
