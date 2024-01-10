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
//import { LoginPage } from "../components";
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
    <div>
      <div
        className=" bg-cover bg-center bg-no-repeat min-h-screen "
        /*style={{
          backgroundImage:
            "url(https://hostel-gentileza.hoteis-em-goias.com/data/Images/OriginalPhoto/12056/1205674/1205674189/image-alto-paraiso-de-goias-hostel-gentileza-13.JPEG)",
        }}*/
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJsdWUlMjB3YXRlcnxlbnwwfHwwfHx8MA%3D%3D)",
        }}
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
                <button
                  title="Signup"
                  className="bg-black py-3 ml-7 px-7 rounded-full text-white"
                >
                  LOG IN
                </button>

                <p className="md:flex hidden ml-7 text-3xl relative  text-center font-bold">
                  MyHostel
                </p>

                <div className="gap-6 px-5">
                  <div className="flex gap-3 p-5">
                    <label className="md:flex hidden">HOME</label>
                    <label className="md:flex hidden">CONTACT</label>
                    <label className="md:flex hidden">ABOUT</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div>
          <div className="flex justify-center   text-center">
            <div className="flex flex-col space-y-6 mt-10">
              <span className=" text-xl  text-white">
                Your home away from home!
              </span>
              <span className=" text-5xl font-extrabold md:text-5xl lg:text-6xl text-white ">
                RightHere
              </span>
              <a
                href="#_"
                className="w-1/3 flex justify-center items-center px-4 py-2 bg-white text-black font-semibold relative  overflow-hidden    shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-black group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-black group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-black opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease border-black">
                  Get Started
                </span>
              </a>
              <div>
                {" "}
                <div className="bg-red-100 h-screen w-screen">
                  <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
                    <Blob />
                    <MyIcosahedronGeometry args={[2, 20]} />{" "}
                  </Canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white text-lg flex justify-between items-center  px-5 ">
            <div
              className="
            flex flex-col space-y-4 font-bold w-1/5 "
            >
              {" "}
              <div className="border-t-4 border-white"></div>
              <button className="flex">
                Home
                <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
              </button>
              <div className="border-t-4 border-white"></div>
              <button className="flex">
                About
                <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
              </button>
              <div className="border-t-4 border-white"></div>
              <button className="flex">
                Contact
                <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
              </button>
              <div className="border-t-4 border-white"></div>
            </div>
            <div className="flex flex-col space-y-4">
              <Image
                alt="hostel sample img 1"
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zdGVsfGVufDB8fDB8fHww"
                width={300}
                height={300}
                className="rounded-md shadow-md  p-2  transition-filter duration-300 ease-in-out border-white relative  border-4 "
              />
              {/*<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="font-semibold text-blue-500 ">
                  Abc hostel, Kenya
                </div>
              </span>*/}
              <Image
                alt="hostel sample img 1"
                src="https://images.unsplash.com/photo-1619810230359-b2c2f61c49cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
                height={300}
                className="rounded-md shadow-md  p-2  transition-filter duration-300 ease-in-out border-white relative  border-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between h-screen">
        <div className="w-1/2 flex justify-center bg-gray-100">
          <div className="flex justify-center items-center ">
            <Swiper
              className="mySwiper flex w-full h-full max-w-[500px] max-h-[440px]  justify-center items-center"
              autoplay={{
                delay: 2500,
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
                  className="w-[400px] h-[400px] flex justify-center items-center  m-auto rounded-2xl"
                />
              </SwiperSlide>
              <SwiperSlide className="flex w-full h-full justify-center items-center">
                <img
                  src="https://img.freepik.com/free-photo/young-friends-hostel_52683-121726.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=ais"
                  className="w-[400px] h-[400px] flex justify-center items-center m-auto rounded-2xl"
                />
              </SwiperSlide>
              <SwiperSlide className="flex w-full h-full justify-center items-center">
                <img
                  src="https://img.freepik.com/free-photo/architecture-sleep-window-relax-old_1253-605.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=ais"
                  className="w-[400px] h-[400px] flex justify-center items-center mx-auto my-auto rounded-2xl"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="w-1/2 bg-gray-100">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen min-h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow-sm md:mt-0 sm:max-w-md xl:p-0 dark:bg-white ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x">
                  Log in to student account
                </h1>
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      className="bg-gray-100 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-500"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <input
                      className="bg-gray-100 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-500"
                      placeholder=".........."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-700">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="text-black bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-xs px-10 py-4 dark:bg-gray-300 dark:hover:bg-gray-400 dark:focus:ring-black border border-gray-700 max-w-xs mx-auto block"
                  >
                    Log in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="flex justify-between h-screen">
          <div className="w-1/2 bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen min-h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow-sm md:mt-0 sm:max-w-md xl:p-0 dark:bg-white">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x">
                    Log in to admin account
                  </h1>
                  <form className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Your email
                      </label>
                      <input
                        className="bg-gray-100 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-500"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Password
                      </label>
                      <input
                        className="bg-gray-100 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-500"
                        placeholder=".........."
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-700">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="text-black bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-xs px-10 py-4 dark:bg-gray-300 dark:hover:bg-gray-400 dark:focus:ring-black border border-gray-700 max-w-xs mx-auto block"
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light text-gray-700 ">
                      Don’t have an account yet?{" "}
                      <a className="font-medium text-gray-600 hover:underline">
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center h-screen bg-gray-100">
            <div className="w-1/2 flex justify-center bg-gray-100 ">
              <div className="flex justify-center items-center mx-20 mr-35">
                <Swiper
                  className="mySwiper flex w-full h-full max-w-[500px] max-h-[440px]  justify-center items-center"
                  autoplay={{
                    delay: 2500,
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
                      className="w-[400px] h-[400px] flex justify-center items-center  m-auto rounded-2xl"
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex w-full h-full justify-center items-center">
                    <img
                      src="https://cdn.pixabay.com/photo/2013/06/30/19/07/bed-142516_1280.jpg"
                      className="w-[400px] h-[400px] flex justify-center items-center m-auto rounded-2xl"
                    />
                  </SwiperSlide>
                  <SwiperSlide className="flex w-full h-full justify-center items-center">
                    <img
                      src="https://img.freepik.com/free-photo/sleeping-mattress-bright-hostel-background_1253-665.jpg?size=626&ext=jpg&ga=GA1.1.1161610126.1702110340&semt=sph"
                      className="w-[400px] h-[400px] flex justify-center items-center mx-auto my-auto rounded-2xl"
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
