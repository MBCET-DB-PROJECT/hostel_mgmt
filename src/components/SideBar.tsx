import React from "react";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden md:block md:w-1/6 bg-white h-screen shadow-lg">
        {/* Sidebar content */}
        <div className="p-4 text-black">
          <h1 className="text-xl font-semibold">Sidebar</h1>
          {/* Add your sidebar links or components here */}
        </div>
      </div>
      <div className="md:block md:w-5/6 bg-gray-200 h-screen ">hi</div>
    </div>
  );
};

export default Sidebar;
