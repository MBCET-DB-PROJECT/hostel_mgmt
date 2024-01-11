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
        <div className="flex flex-col md:p-10 p-5">
          <p className="text-5xl text-black font-semibold">Welcome Back!</p>
          <div className="flex md:justify-end justify-center">
            <div className="flex flex-col space-y-16 mr-5">
              <div className="w-48 h-48 bg-gradient-to-r from-purple-600  to-blue-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
                <div className="text-6xl">500</div>{" "}
                <div className="uppercase font-semibold text-sm">Students</div>
              </div>
              <div className="w-48 h-48 bg-gradient-to-r from-blue-600  to-purple-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
                <div className="text-6xl">100</div>{" "}
                <div className="uppercase font-semibold text-sm">Rooms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
