import { Span } from "next/dist/trace";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import "./../app/globals.css";
import { Canvas } from "@react-three/fiber";
import Blob from "../components/Blob";
import Head from "next/head";
import { FaCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaStarOfLife } from "react-icons/fa";
import MyIcosahedronGeometry from "../components/Blob/MyIcosahedronGeometry";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";
import Diya from "./../../public/Diya.png";
import Toast from "@/components/Toast";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
  useInView,
  useIsPresent,
} from "framer-motion";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app, { auth } from "@/app/firebase";
import { FirebaseError } from "firebase/app";

import LoginComponent from "@/components/Slider/LoginComponent";

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface AdminSignup {
  name: string;
  role: string;
  email: string;
  password: string;
}

export default function Home() {
  const controls = useAnimation();
  const adminforms = useAnimation();
  const stdforms = useAnimation();
  const { scrollY } = useScroll();
  const image = useAnimation();
  const user = useAuthState(auth);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollY.get() > 800) {
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
    console.log("Page scroll: ", latest);
  });
  const [showToast, setShowToast] = useState(false);
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

  const [formData, setFormData] = useState<AdminSignup>({
    email: "",
    password: "",
    name: "",
    role: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("handlelogin function called");

    const { email, password } = formData;

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      window.location.href = "/UserHome";
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
      }
    }
  };

  const handleAdminLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("handlelogin function called");

    const { email, password } = formData;

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      window.location.href = "/AdminHome";
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);
      }
    }
  };

  const handleAdminSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    const auth = getAuth(app);

    setShowToast(true);

    const { name, email, password } = formData;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const admin = userCredential.user;

      console.log("Admin user ID:", admin.uid); // Log the admin user ID

      const db = getFirestore(app);
      const adminDocRef = doc(db, "admin", admin.uid);
      const adminData = {
        name,
        roles: admin.uid,
      };

      await setDoc(adminDocRef, adminData);

      console.log("User created and stored");
      window.location.href = "/AdminHome";
    } catch (error: any) {
      console.error("Error creating user", error.code, error.message);
    }
  };
  //popuppppppppp
  const [popupAbhishek, setPopupAbhishek] = useState<boolean>(false);
  const [popupGayathri, setPopupGayathri] = useState<boolean>(false);
  const [popupAdlu, setPopupAdlu] = useState<boolean>(false);
  const [popupDiya, setPopupDiya] = useState<boolean>(false);

  const handleButtonClick = (
    member: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    switch (member) {
      case "Abhishek":
        setPopupAbhishek(!popupAbhishek);
        break;
      case "Gayathri":
        setPopupGayathri(!popupGayathri);
        break;
      case "Adlu":
        setPopupAdlu(!popupAdlu);
        break;
      case "Diya":
        setPopupDiya(!popupDiya);
        break;
      default:
        break;
    }
  };

  const renderPopup = (member: string, showPopup: boolean) => {
    let popupContent = "";

    switch (member) {
      case "Abhishek":
        popupContent = "Whens GTA VI coming out again?";
        break;
      case "Gayathri":
        popupContent = "On the search for my daily dose of caffeine :)";
        break;
      case "Adlu":
        popupContent = "I breathe,eat and live Spotify.";
        break;
      case "Diya":
        popupContent = "Whos gonna put content for me?";
        break;
      default:
        break;
    }

    if (showPopup) {
      return (
        <div
          id={`popup-${member}`}
          className="bg-white border text-sm border-gray-200 rounded-lg shadow p-2 flex flex-col items-center"
        >
          <p className="text-sm">{popupContent}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="overflow-x-hidden">
      <div>
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
                  href="#login"
                  className="relative inline-flex items-center justify-center p-2 ml-2 
                  overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group"
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
                    <Link href="#">
                      {" "}
                      <label className="md:flex hidden hover:text-blue-600">
                        HOME
                      </label>
                    </Link>
                    <Link href="#explore">
                      {" "}
                      <label className="md:flex hidden hover:text-blue-600">
                        EXPLORE
                      </label>
                    </Link>
                    <Link href="#team">
                      <label className="md:flex hidden hover:text-blue-600">
                        CONTACT
                      </label>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 70 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex justify-center   ">
            <div className="flex flex-col  mt-20">
              <span className="text-9xl font-extrabold text-black ">
                RightHere
              </span>
            </div>
          </div>
        </motion.div>
        <div className="text-black text-lg flex justify-between items-center  px-10 justify-top">
          <div
            className="
            flex flex-col  font-bold w-1/3 justify-top"
          >
            {" "}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 70 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="space-y-3">
                <div className="border-t-2 border-black"></div>
                <div>
                  <Link href="#">
                    <button className="flex w-full">
                      Home
                      <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle " />
                    </button>
                  </Link>
                </div>
                <div className="border-t-2 border-black"></div>
                <div>
                  <Link href="#explore">
                    <button className="flex w-full">
                      Explore
                      <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
                    </button>
                  </Link>
                </div>
                <div className="border-t-2 border-black"></div>
                <div>
                  {" "}
                  <Link href="#team">
                    <button className="flex w-full">
                      Team
                      <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
                    </button>
                  </Link>
                </div>
                <div className="border-t-2 border-black"></div>
                <div>
                  <Link href="#login">
                    <button className="flex w-full">
                      Login
                      <FaCircle className="text-blue-500 mt-1.5 ml-2  blue-circle hidden" />
                    </button>
                  </Link>
                </div>
                <div className="border-t-2 border-black"></div>
              </div>
            </motion.div>
            <div className="text-blue-600 w-full text-3xl mt-40 flex flex-col space-x-1">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 70 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div>Your one-stop destination for all</div>
                <div> your hostel management activities.</div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 70 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {" "}
                <a
                  href="#adminsignup"
                  className="mt-5 ml-28 relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
                >
                  <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-indigo-600 rounded-full blur-md ease"></span>
                  <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                    <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                    <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-600 rounded-full blur-md"></span>
                  </span>
                  <span className="relative text-white text-base flex">
                    Get Started!
                    <FaArrowRight className="mt-1 ml-1" />
                  </span>
                </a>
              </motion.div>
              <div></div>
            </div>
          </div>

          <div className="w-full  h-screen ">
            <div
              className=" h-full flex  z-50"
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
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 70 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  alt="hostel sample img 1"
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zdGVsfGVufDB8fDB8fHww"
                  width={500}
                  height={500}
                  className=" aspect-w-1 aspect-h-1 object-cover rounded-lg  "
                />
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 70 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Image
                  alt="hostel sample img 1"
                  src="https://www.thebrokebackpacker.com/wp-content/uploads/2021/08/Kex-Hostel.jpg"
                  width={500}
                  height={500}
                  className="aspect-w-1 aspect-h-1 object-cover rounded-lg  "
                />
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 70 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link href="#about">
                  <button className="w-full border-2 border-black p-1 rounded-lg text-black flex justify-center  hover:font-semibold">
                    <FaPlus className="text-blue-600 mt-1 mr-1" />
                    See More
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:justify-between md:flex-row flex-col h-screen">
        <div className="w-1/2 flex justify-center bg-gray-100">
          <div className="flex justify-center items-center ">
            <Swiper
              className="mySwiper flex w-full h-full md:max-w-[700px] md:max-h-[700px] max-w-[400px] max-h-[400px] justify-center items-center"
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
                  src="https://cdn.pixabay.com/photo/2013/06/30/19/07/bed-142516_1280.jpg"
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
          <div
            id="about"
            className="flex flex-col  justify-center md:px-6 md:py-8 mx-auto md:h-screen min-h-screen "
          >
            <div className="text-left flex flex-col ">
              <div className="p-2 border-black border-2 rounded-full md:w-1/4 w-1/2 text-center flex justify-center font-semibold md:text-xl text-base">
                <FaStarOfLife className="mt-1 mr-2" /> About
              </div>
              <div className="mt-5 text-5xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">
                One Stop Destination
              </div>
              <div className="text-right mt-10 ">
                Welcome to a world of cozy rooms, shared laughter, and the
                buzzing camaraderie of hostel life! Our hostel management system
                simplifies tasks and streamlines operations, saving time and
                ensuring accuracy. From room allocations to raising tickets,
                we&apos;ve got you covered. With our system, you can bid
                farewell to the chaos and embrace the serenity of efficient
                hostel management.Its so effective that even Hogwarts wants to
                upgrade - turns out managing magical dormitories isnt as
                enchanting as it seems!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div id="explore" className="flex justify-between h-screen">
          <div className="w-1/2 bg-gray-100">
            <div className="flex flex-col  justify-center px-6 py-8 mx-auto md:h-screen min-h-screen ">
              <div className="text-left flex flex-col ">
                <div className="p-2 border-black border-2 rounded-full w-1/4 text-center flex justify-center font-semibold text-xl">
                  <FaStarOfLife className="mt-1 mr-2" /> Explore
                </div>
                <div className="mt-5 text-5xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">
                  Efficiency,Reliability,Quality
                </div>
                <div className="text-right mt-10">
                  Our website is like the Swiss Army knife of hostel management.
                  It doesn&apos;t just stop at login screens and notifications;
                  it&apos;s a symphony of features designed to make your life
                  easier. From the sleek admin dashboard where you can
                  effortlessly steer the ship, to the user login that feels like
                  a welcome mat, we&apos;ve crafted an experience that&apos;s
                  smoother than a jazz saxophone solo. Security is our superhero
                  - your data is guarded more fiercely than a dragon guards its
                  treasure.
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
      <div
        id="login"
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <div>
          <link rel="icon" href="/favicon.ico" />
        </div>

        <LoginComponent />
      </div>
      <div id="adminsignup" className="bg-gray-100 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0 shadow-lg">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Get Started (with) RightHere!
              </h1>
              <form
                onSubmit={handleAdminSignup}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={formData.name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <p className="text-xs text-gray-400 ">
                    (minimum pw length is 6 characters)
                  </p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Create an account
                </button>
              </form>
              {showToast && (
                <Toast
                  message="Account created successfully."
                  type="success"
                  onClose={() => setShowToast(false)}
                />
              )}
            </div>
          </div>
          <h1 className="text-sm mt-4 text-gray-500">
            *Creating an account raises a ticket and we will be in touch with
            you soon!
          </h1>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div id="team" className="bg-gray-100 ">
          <div className="flex flex-col  w-full justify-center items-center ">
            <div className="p-2 mb-16 border-black border-2 rounded-full w-1/4 text-center flex justify-center font-semibold text-xl">
              <FaStarOfLife className="mt-1 mr-2 " /> Meet the Team
            </div>
            <div className="mt-10 flex justify-between px-10">
              <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow flex justify-center h-1/2 ">
                <div>
                  <img
                    className="rounded-full p-2"
                    src="/Abhishek.png"
                    alt=""
                  />
                </div>
                <div className="p-5">
                  <div>
                    <button
                      onClick={(event) => handleButtonClick("Abhishek", event)}
                      className="mb-2 text-2xl font-bold tracking-tight text-gray-900 "
                    >
                      Abhishek Raman
                    </button>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 flex flex-row  justify-around ">
                    <a
                      href="https://github.com/ice-weasel"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaGithub size={26} className="" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abhishek-raman-18b283227/"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaLinkedin size={26} />
                    </a>
                  </p>
                  {renderPopup("Abhishek", popupAbhishek)}
                </div>
              </div>

              <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow flex justify-center h-1/2">
                <a href="#">
                  <img
                    className="rounded-full  p-2"
                    src="/Gayathri.png"
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <div>
                    <button
                      onClick={(event) => handleButtonClick("Gayathri", event)}
                      className="mb-2 text-2xl font-bold tracking-tight text-gray-900 "
                    >
                      Gayathri S
                    </button>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 flex flex-row  justify-around ">
                    <a
                      href="https://github.com/gaxatri"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaGithub size={26} className="" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/gayathri-s-52351a230/"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaLinkedin size={26} />
                    </a>
                  </p>
                  {renderPopup("Gayathri", popupGayathri)}
                </div>
              </div>
              <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow flex justify-center h-1/2">
                <a href="#">
                  <img className="rounded-full  p-2" src="/Adlu.png" alt="" />
                </a>
                <div className="p-5">
                  <div>
                    <button
                      onClick={(event) => handleButtonClick("Adlu", event)}
                      className="mb-2 text-2xl font-bold tracking-tight text-gray-900 "
                    >
                      Adlu Rahman
                    </button>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 flex flex-row  justify-around ">
                    <a
                      href="https://github.com/fRidge69"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaGithub size={26} className="" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/adlu-rahman-m/"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaLinkedin size={26} />
                    </a>
                  </p>
                  {renderPopup("Adlu", popupAdlu)}
                </div>
              </div>
              <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow flex justify-center h-1/2">
                <a href="#">
                  <img className="rounded-full  p-2" src="/Diya.png" alt="" />
                </a>
                <div className="p-5">
                  <div>
                    <button
                      onClick={(event) => handleButtonClick("Diya", event)}
                      className="mb-2 text-2xl font-bold tracking-tight text-gray-900 "
                    >
                      Diya Sundeep
                    </button>
                  </div>
                  <p className="mb-3 font-normal text-gray-700 flex flex-row  justify-around ">
                    <a
                      href="https://github.com/dxyaa"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaGithub size={26} className="" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/diya-sundeep/"
                      className="hover:bg-gray-300 rounded-lg p-2"
                    >
                      {" "}
                      <FaLinkedin size={26} />
                    </a>
                  </p>
                  {renderPopup("Diya", popupDiya)}
                </div>
              </div>
            </div>
          </div>
        </div>
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
