import { Span } from "next/dist/trace";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import "./../app/globals.css";
import { Canvas } from "@react-three/fiber";
import Blob from "../components/Blob";
import Head from "next/head";
import { FaCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
//import { LoginPage } from "../components";
import { FaStarOfLife } from "react-icons/fa";
import MyIcosahedronGeometry from "../components/Blob/MyIcosahedronGeometry";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import LoginComponent from "@/components/Slider/LoginComponent";

export default function Home() {
  const controls = useAnimation();
  const adminforms = useAnimation();
  const stdforms = useAnimation();
  const { scrollY } = useScroll();
  const image = useAnimation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollY.get() > 800) {
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
    console.log("Page scroll: ", latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = scrollY.get();

      const adminLoginOffset = 100;
      const studentLoginOffset = 200;

      adminforms.start({ y: -scrollPosition / adminLoginOffset });
      stdforms.start({ y: -scrollPosition / studentLoginOffset });
      image.start({ y: -scrollPosition / studentLoginOffset });
    };
    scrollY.onChange(handleScroll);
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY, controls, stdforms, adminforms, image]);
  return (
    <div className="overflow-x-hidden">
      <div

      /*style={{
          backgroundImage:
            "url(https://hostel-gentileza.hoteis-em-goias.com/data/Images/OriginalPhoto/12056/1205674/1205674189/image-alto-paraiso-de-goias-hostel-gentileza-13.JPEG)",
        }}*/
      >
        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.3 }}
          className="fixed w-full z-50 "
        >
          <div className="z-10 flex justify-center w-full h-full text-black items-center ">
            <div className="md:w-[90%] w-[95%] h-full bg-opacity-0.2 backdrop-filter backdrop-blur-3xl p-1  m-2 z-2 rounded-full shadow-xl text-slate-800 font-semibold">
              <div className="flex items-center relative justify-between">
                <a
                  href="#_"
                  className="relative inline-flex items-center justify-center p-2 ml-2 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-black  transition-all duration-300 transform group-hover:translate-x-full ease">
                    LOGIN
                  </span>
                  <span className="relative invisible">Button Text</span>
                </a>

                <p className="md:flex hidden ml-7 text-3xl relative  text-center font-bold">
                  RightHere
                </p>

                <div className="gap-6 px-5">
                  <div className="flex gap-3 p-5">
                    <label className="md:flex hidden hover:text-blue-600">
                      HOME
                    </label>
                    <label className="md:flex hidden hover:text-blue-600">
                      EXPLORE
                    </label>
                    <label className="md:flex hidden hover:text-blue-600">
                      CONTACT
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center   ">
          <div className="flex flex-col  mt-20">
            {/*<span className=" text-xl  text-black">
                Your home away from home!
              </span>*/}
            <span className="text-9xl font-extrabold text-black ">
              RightHere
            </span>
            {/*<a
                href="#_"
                className=" flex justify-center items-center px-4 py-2 bg-black text-white font-semibold relative  overflow-hidden    shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-black group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-black group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-500 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-blue-500 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-blue-500 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease ">
                  Get Started
                </span>
              </a>*/}
          </div>
        </div>
        <div className="text-black text-lg flex justify-between items-center  px-10 justify-top">
          <div
            className="
            flex flex-col  font-bold w-1/3 justify-top"
          >
            {" "}
            <div className="space-y-3">
              <div className="border-t-2 border-black"></div>
              <button className="flex w-full">
                Home
                <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle " />
              </button>
              <div className="border-t-2 border-black"></div>
              <button className="flex w-full">
                Explore
                <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
              </button>
              <div className="border-t-2 border-black"></div>
              <button className="flex w-full">
                Contact
                <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
              </button>
              <div className="border-t-2 border-black"></div>
              <button className="flex w-full">
                Login
                <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
              </button>
              <div className="border-t-2 border-black"></div>
            </div>
            <div className="text-blue-600 w-full text-3xl mt-40 flex flex-col space-x-1">
              <div>Your one-stop destination for all</div>
              <div> your hostel management activities.</div>
              <div></div>
            </div>
          </div>

          <div className="w-full  h-screen ">
            <div
              className=" h-full flex "
              onClick={() => console.log("clicked")}
            >
              <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
                <Blob />
                <MyIcosahedronGeometry args={[2, 20]} />{" "}
              </Canvas>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="flex flex-col space-y-3 justify-top">
              <Image
                alt="hostel sample img 1"
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zdGVsfGVufDB8fDB8fHww"
                width={500}
                height={500}
                className=" aspect-w-1 aspect-h-1 object-cover rounded-lg  "
              />
              {/*<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="font-semibold text-blue-500 ">
                  Abc hostel, Kenya
                </div>
              </span>*/}
              <Image
                alt="hostel sample img 1"
                src="https://www.thebrokebackpacker.com/wp-content/uploads/2021/08/Kex-Hostel.jpg"
                width={500}
                height={500}
                className="aspect-w-1 aspect-h-1 object-cover rounded-lg  "
              />
              <button className="w-full border-2 border-black p-1 rounded-lg text-black flex justify-center">
                <FaPlus className="text-blue-600 mt-1 mr-1" />
                See More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between h-screen">
        <div className="w-1/2 flex justify-center bg-gray-100">
          <div className="flex justify-center items-center ">
            <Swiper
              className="mySwiper flex w-full h-full max-w-[700px] max-h-[700px]  justify-center items-center"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              <SwiperSlide className="flex w-full h-full justify-center items-center  ">
                <img
                  src="https://img.freepik.com/free-photo/teen-couple-reading-library_23-2147860608.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=ais"
                  className="w-[600px] h-[600px] flex justify-center items-center  m-auto rounded-2xl"
                />
              </SwiperSlide>
              <SwiperSlide className="flex w-full h-full justify-center items-center">
                <img
                  src="https://img.freepik.com/free-photo/young-friends-hostel_52683-121726.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=ais"
                  className="w-[600px] h-[600px] flex justify-center items-center m-auto rounded-2xl"
                />
              </SwiperSlide>
              <SwiperSlide className="flex w-full h-full justify-center items-center">
                <img
                  src="https://img.freepik.com/free-photo/architecture-sleep-window-relax-old_1253-605.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=ais"
                  className="w-[600px] h-[600px] flex justify-center items-center mx-auto my-auto rounded-2xl"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="w-1/2 bg-gray-100">
          <div className="flex flex-col  justify-center px-6 py-8 mx-auto md:h-screen min-h-screen ">
            <div className="text-left flex flex-col ">
              <div className="p-2 border-black border-2 rounded-full w-1/4 text-center flex justify-center font-semibold text-xl">
                <FaStarOfLife className="mt-1 mr-2" /> About
              </div>
              <div className="mt-5 text-5xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">
                One Stop Destination
              </div>
              <div className="text-right mt-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="flex justify-between h-screen">
          <div className="w-1/2 bg-gray-100">
            <div className="flex flex-col  justify-center px-6 py-8 mx-auto md:h-screen min-h-screen ">
              <div className="text-left flex flex-col ">
                <div className="p-2 border-black border-2 rounded-full w-1/4 text-center flex justify-center font-semibold text-xl">
                  <FaStarOfLife className="mt-1 mr-2" /> Explore
                </div>
                <div className="mt-5 text-5xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">
                  Efficiecy,Reliability,Quality
                </div>
                <div className="text-right mt-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center h-screen bg-gray-100">
            <div className="w-1/2 flex justify-center bg-gray-100 ">
              <div className="flex justify-center items-center mx-20 mr-35">
                <Swiper
                  className="mySwiper flex w-full h-full max-w-[700px] max-h-[700px]  justify-center items-center"
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    dynamicBullets: true,
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                >
                  <SwiperSlide className="flex w-full h-full justify-center items-center  ">
                    <img
                      src="https://img.freepik.com/premium-photo/detail-residential-house-turned-into-hostel_1048944-26070141.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=sph"
                      className="w-[600px] h-[600px] flex justify-center items-center  m-auto rounded-2xl"
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex w-full h-full justify-center items-center">
                    <img
                      src="https://cdn.pixabay.com/photo/2013/06/30/19/07/bed-142516_1280.jpg"
                      className="w-[600px] h-[600px] flex justify-center items-center m-auto rounded-2xl"
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex w-full h-full justify-center items-center">
                    <img
                      src="https://img.freepik.com/free-photo/sleeping-mattress-bright-hostel-background_1253-665.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=sph"
                      className="w-[600px] h-[600px] flex justify-center items-center mx-auto my-auto rounded-2xl"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div>
          <link rel="icon" href="/favicon.ico" />
        </div>

        <LoginComponent />
      </div>
      <footer className="bg-white rounded-lg shadow ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              RightHere™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
