import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useCycle,
} from "framer-motion";
import { useEffect } from "react";
import "./../app/globals.css";
import SphereComp from "./SphereComp";

const items = [0, 1, 2, 3, 4];
const height = 70;
const padding = 10;
const size = 150;
const pages = [1, 2, 3, 4, 5];

export default function AdminHomeComp() {
  const scrollY = useMotionValue(0);

  const width = useTransform(
    scrollY,
    [0, -getHeight(items) + size],
    ["calc(0% - 0px)", "calc(100% - 40px)"]
  );

  return (
    <div className="flex jusify-between w-full md:flex-row flex-col">
      <div className=" min-h-screen md:w-1/2 w-full ">
        <div className=" md:p-10 p-5 min-h-screen flex flex-col space-y-10">
          <p className="text-5xl text-black font-semibold md:p-0 p-2">
            Welcome Back!
          </p>
          <div className="flex justify-center items-center flex-col  pt-30">
            <h1 className="p-4 text-lg font-semibold text-gray-400 md:mb-6">
              Latest Notifications
            </h1>
            <motion.div
              style={{
                width: 400,
                height: 200,
                borderRadius: 30,
                overflow: "hidden",
                position: "relative",
                transform: "translateZ(0)",
                cursor: "grab",
              }}
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div
                style={{ width: 400, height: getHeight(items), y: scrollY }}
                drag="y"
                dragConstraints={{
                  top: -getHeight(items) + size,
                  bottom: 0,
                }}
                className="p-4"
              >
                {items.map((index) => {
                  return (
                    <motion.div
                      style={{
                        width: 400,
                        height: height,
                        borderRadius: 20,
                        backgroundColor: "#fff",
                        position: "absolute",
                        top: (height + padding) * index,
                      }}
                      key={index}
                      className="flex justify-center"
                    >
                      test
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
            <motion.div
              style={{
                width: width,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#fff",
                //position: "absolute",
                bottom: 20,
                left: 20,
              }}
              className="mt-5"
            />
          </div>
          <h1 className="p-4 text-lg font-semibold text-gray-400 text-center">
            Tickets
          </h1>
          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              display: "flex",
              paddingBottom: "20px",
            }}
            className=""
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                style={{
                  minWidth: "150px",
                  minHeight: "70px",
                  flexShrink: 0,
                  marginRight: "10px",
                  backgroundColor: "#4F46E5",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  userSelect: "none",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full  bg-slate-200 md:pb-0 pb-4  space-y-40">
        <div className="flex  justify-center md:space-x-20 md:flex-row flex-col items-center md:pt-10 space-y-10 md:space-y-0">
          <div className="w-48 h-48 bg-gradient-to-r from-purple-600  to-blue-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
            <div className="text-6xl">12</div>{" "}
            <div className="uppercase font-semibold text-sm">Students</div>
          </div>

          <div className="w-48 h-48 bg-gradient-to-r from-purple-600  to-blue-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
            <div className="text-6xl">30</div>{" "}
            <div className="uppercase font-semibold text-sm">Rooms</div>
          </div>
        </div>
        <div className="flex justify-center">{/*smth here*/}</div>
      </div>
    </div>
  );
}
function getHeight(items: any) {
  const totalHeight = items.length * height;
  const totalPadding = (items.length - 1) * padding;
  const totalScroll = totalHeight + totalPadding;
  return totalScroll;
}
