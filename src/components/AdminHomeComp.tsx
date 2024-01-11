import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useCycle,
} from "framer-motion";
import { useEffect } from "react";

const items = [0, 1, 2, 3, 4];
const height = 70;
const padding = 10;
const size = 150;
const pages = [1, 2, 3, 4, 5];
const itemstickets = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

export default function AdminHomeComp() {
  const scrollY = useMotionValue(0);

  const width = useTransform(
    scrollY,
    [0, -getHeight(items) + size],
    ["calc(0% - 0px)", "calc(100% - 40px)"]
  );

  return (
    <div className="flex jusify-between w-full">
      <div className=" min-h-screen w-1/2 ">
        <div className=" md:p-10 p-5 min-h-screen ">
          <p className="text-5xl text-black font-semibold">Welcome Back!</p>
          <div className="flex justify-center items-center flex-col  pt-20 ">
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
          <div
            style={{
              width: "100%",
              overflowX: "scroll",
              display: "flex",
              padding: "20px",
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                style={{
                  minWidth: "200px", // Adjust the width of each item as needed
                  flexShrink: 0, // Prevent items from shrinking when container is too small
                  marginRight: "10px", // Adjust the margin between items
                  backgroundColor: "#3498db", // Set background color
                  color: "#fff", // Set text color
                  padding: "10px", // Set padding
                  borderRadius: "8px", // Set border radius
                  userSelect: "none", // Disable text selection
                  cursor: "pointer", // Set cursor to pointer
                }}
                whileHover={{ scale: 1.1 }} // Add a scaling effect on hover
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2  ">
        <div className="flex  justify-center space-x-20 flex-row pt-10">
          <div className="w-48 h-48 bg-gradient-to-r from-purple-600  to-blue-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
            <div className="text-6xl">12</div>{" "}
            <div className="uppercase font-semibold text-sm">Students</div>
          </div>

          <div className="w-48 h-48 bg-gradient-to-r from-purple-600  to-blue-600 rounded-full flex text-white justify-center items-center text-center flex-col space-y-2">
            <div className="text-6xl">30</div>{" "}
            <div className="uppercase font-semibold text-sm">Rooms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function getHeight(items) {
  const totalHeight = items.length * height;
  const totalPadding = (items.length - 1) * padding;
  const totalScroll = totalHeight + totalPadding;
  return totalScroll;
}
