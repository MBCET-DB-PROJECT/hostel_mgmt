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
          <br />
          <br />
          <div className="flex bg-gradient-to-r from-transparent to-blue-500 shadow-lg flex-row justify-end items-center">
            <p className="text-6xl text-end mr-5">Students Living here</p>
            <motion.p
              initial={{ y: 50, scale: 0, opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.3 }}
              className="text-9xl text-end m4-3"
            >
              500
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
