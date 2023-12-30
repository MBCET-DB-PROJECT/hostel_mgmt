import React from "react";

const UserHomeComp = () => {
  return (
    <div className="w-full flex justify-center ">
      {" "}
      <div className="flex flex-col justify-center space-y-10 m-10 w-full  ">
        <div className="font-semibold text-3xl">
          Welcome&nbsp;Back&nbsp;Abcd!
        </div>
        <div className="flex md:flex-row flex-col md:justify-around w-full  md:space-x-10 space-y-10 md:space-y-0 ">
          <div className="w-full md:w-1/2 h-64 md:h-64 bg-gradient-to-b from-blue-500 to-slate-300  rounded-md">
            <div className="flex justify-between h-full m-2 ">
              <div className="w-1/2  h-full rounded-md flex justify-center items-center">
                <img
                  src="https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png"
                  className="h-44 w-40 flex justify-center border border-2 p-2 border-black  rounded-lg shadow-lg"
                ></img>
              </div>
              <div className="w-1/2  h-full rounded-md flex justify-center items center text-left flex-col p-2 space-y-3 font-semibold">
                <p>Name : </p>
                {/*<p className=" border-black border-t-2"></p>*/}
                <p>Semester : </p>
                {/*<p className=" border-black border-t-2"></p>*/}
                <p>Class : </p>
                {/*<p className=" border-black border-t-2"></p>*/}
                <p>Room No : </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-64 bg-gradient-to-b from-blue-500 to-slate-300 rounded-md">
            Box 2
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:justify-around w-full  md:space-x-10 space-y-10 md:space-y-0 ">
          <div className="w-full md:w-1/2 h-64 md:h-64 bg-gradient-to-b from-blue-500 to-slate-300  rounded-md ">
            <div className="flex justify-center flex-col p-5 font-semibold space-y-6">
              <div className="flex flex-row justify-between">
                <p>Mother : </p>
                <p>Phn No : </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Father : </p>
                <p>Phn No : </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Local Guardian : </p>
                <p>Phn No : </p>
              </div>
              <p>Addres : </p>
              <p></p>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-64 bg-gradient-to-b from-blue-500 to-slate-300  rounded-md">
            <div className="flex justify-center flex-col p-5 font-semibold space-y-6">
              <p>Phn No : </p>
              <p>Local Address : </p>
              <p>Roommates : </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomeComp;
