import Sidebar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import React, { useState, ChangeEvent, FormEvent } from "react";
import "tailwindcss/tailwind.css";
import { FaPlus } from "react-icons/fa";
import { showToast } from "@/components/Toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateStudent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle image upload logic here
    console.log("Image uploaded:", image);
    showToast("submitted successfully", "success");
  };
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <TopBar onSidebarToggle={handleSidebarToggle} />
      <div className="flex">
        <div
          className={`md:block md:w-1/6 bg-white h-screen shadow-lg ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div className="md:block md:w-5/6 bg-gray-100 h-screen w-full ">
          <div className="flex justify-center text-center">
            <h1 className=" mt-6 font-semibold text-3xl">Add Students</h1>
          </div>
          <div className="flex bg-gray-100">
            <div className="m-auto">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mt-5 bg-white rounded-lg shadow-lg mx-4">
                    <div className="flex">
                      <div className="flex-1 py-5 pl-5  overflow-hidden">
                        <h1 className="inline text-2xl font-semibold leading-none">
                          Create Student Account
                        </h1>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      <input
                        placeholder="Name"
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                        required
                      />
                      <input
                        placeholder="Email"
                        type="email"
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                        required
                      />
                      <input
                        placeholder="Password"
                        type="password"
                        className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current"
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="mt-5 bg-white rounded-lg shadow-lg mx-4 mb-5">
                    <div className="flex">
                      <div className="flex-1 py-5 pl-5  overflow-hidden">
                        <h1 className="inline text-2xl font-semibold leading-none">
                          Additional Details
                        </h1>
                      </div>
                    </div>
                    <div className="px-5 pb-5 flex flex-col">
                      <div className="md:flex md:flex-row md:justify-between">
                        {" "}
                        <input
                          placeholder="Class (Eg:CS2)"
                          className=" text-black placeholder-gray-500 md:w-1/3 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                        <input
                          placeholder="Assign Room (Eg:302)"
                          className=" text-black placeholder-gray-500 md:w-1/3 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                      </div>
                      <div className="md:flex md:flex-row md:justify-between">
                        {" "}
                        <input
                          placeholder="Semester (Eg:S6)"
                          className=" text-black placeholder-gray-500 md:w-1/3 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current "
                          required
                        />
                        <div className="bg-gray-200 rounded-lg md:w-1/3 w-full px-4 py-2.5 mt-2 text-base flex ">
                          <input
                            type="checkbox"
                            className="w-6 h-6 text-black text-sm bg-transparent border-none rounded-md focus:ring-transparent  accent-black"
                          />
                          <label className="block ml-2 text-sm text-gray-900 font-semibold">
                            Fees Paid
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4 px-4 py-2.5">
                      <div className="w-full max-w-md">
                        <label
                          htmlFor="imageInput"
                          className="block text-lg font-medium mb-2"
                        >
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full p-2 border border-2 border-gray-300 rounded-lg"
                        />
                      </div>
                      {image && (
                        <div className="mt-4">
                          <img
                            src={image}
                            alt="Uploaded Preview"
                            className="w-64 h-64 object-cover rounded"
                          />
                        </div>
                      )}
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-5 "
                      >
                        <div className="flex ">
                          {" "}
                          <div className="mr-2 mt-0.5">
                            <FaPlus size={18} />
                          </div>
                          <div>Add</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
