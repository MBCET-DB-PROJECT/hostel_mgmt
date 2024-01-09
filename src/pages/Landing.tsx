import { Span } from "next/dist/trace";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import Head from "next/head";
//import { LoginPage } from "../components";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

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
        className=" bg-cover bg-center bg-no-repeat min-h-screen"
        style={{
          backgroundImage:
            "url(https://hostel-gentileza.hoteis-em-goias.com/data/Images/OriginalPhoto/12056/1205674/1205674189/image-alto-paraiso-de-goias-hostel-gentileza-13.JPEG)",
        }}
      >
        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.3 }}
          className="fixed w-full"
        >
          <div className="z-10 flex justify-center w-full h-full text-black items-center">
            <div className="md:w-[80%] w-[95%] h-full bg-white m-2 z-2 rounded-full shadow-md text-slate-800 font-semibold">
              <div className="flex items-center relative justify-between">
                <button
                  title="Signup"
                  className="bg-black py-3 ml-7 px-7 rounded-full text-white"
                >
                  LOG IN
                </button>

                <p className="md:flex hidden ml-7 text-2xl relative  text-center">
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
          <div className="flex justify-around items-center text-center h-screen">
            <div className="flex flex-col space-y-6">
              <span className=" italic text-3xl font-extrabold md:text-5xl lg:text-6xl text-white  ">
                WELCOME
              </span>
              <span className="italic text-xl font-semibold text-black">
                Your home away from home!
              </span>
              <button className="w-full flex justify-center items-center px-4 py-2 bg-white text-black font-semibold  hover:bg-transparent hover:border-black border-black duration-300 ease-in-out  ">
                Get Started
              </button>
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
      <div>
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-purple-200">
          <Head>
            <title>Slider Login / Signup</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {/*<LoginPage />*/}
        </div>
      </div>
      <footer className="bg-white rounded-lg shadow ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
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
