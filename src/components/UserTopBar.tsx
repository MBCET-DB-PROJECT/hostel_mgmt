import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

import Sidebar from "./SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";

interface TopBarProps {
  onSidebarToggle: () => void;
}


const TopBar: React.FC<{ onSidebarToggle: () => void }> = ({
  onSidebarToggle,
}) => {

  const [user,loading] = useAuthState(auth);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  return (
    <div className="">
      <nav className="bg-white  shadow-lg border-10 border-black md:shadow-lg  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl text-black font-semibold whitespace-nowrap">
              Logo
            </span>
          </a>
          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="bg-transparent rounded-full bg-white relative"
              id="user-button"
              onClick={handleClick}
            >
              <CgProfile className="h-10 w-10 bg-transparent" />
            </button>
            {/* user button on click drop down */}
            {isDropdownVisible && (
              <div
                className="absolute mt-2 top-full right-0 z-50 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-md"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 font-bold">
                    Kewl User
                  </span>
                  <span className="block text-sm text-gray-500 truncate">
                  {user?.email}
                  </span>
                </div>
              </div>
            )}
            {/* hamburgur button for side bar */}
            <button
              id="sidebarbutton"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={onSidebarToggle}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
