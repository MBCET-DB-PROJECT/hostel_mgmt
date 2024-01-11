import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function AdminHomeComp() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ y: 0, scale: 1, opacity: 1 });
  }, [controls]);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="mt-14 flex flex-col">
          <p className="text-7xl text-red-300">Welcome Admin</p>
          <div className="flex justify-end ">
            <div className="flex flex-col space-y-16 mr-5">
              <div className="w-48 h-48 bg-blue-600 rounded-full flex text-white justify-center items-center text-center">
                ess
              </div>
              <div className="w-48 h-48 bg-blue-600 rounded-full flex text-white justify-center items-center text-center">
                ess
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
