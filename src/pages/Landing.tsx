import { Span } from 'next/dist/trace'
import Image from 'next/image'
import "tailwindcss/tailwind.css";

export default function Landing() {
  return (
    <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url(https://hostel-gentileza.hoteis-em-goias.com/data/Images/OriginalPhoto/12056/1205674/1205674189/image-alto-paraiso-de-goias-hostel-gentileza-13.JPEG)' }}>
<nav className="bg-transparent fixed top-0 left-0 w-full z-10">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20">
    <a className="flex items-center space-x-3 rtl:space-x-reverse text-white">
        logo
    </a>

    <div className="hidden w-full md:block md:w-auto " >
      <ul className="font-semibold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent ">
        <li>
          <a href="#" className=" italic block py-2 px-3 text-black rounded text-xl  md:hover:text-white md:hover:bg-transparent md:border-0 md:p-0">Home</a>
        </li>
        <li>
          <a href="#" className="italic block py-2 px-3 text-black rounded text-xl  md:hover:text-white md:hover:bg-transparent md:border-0 md:p-0">About</a>
        </li>
       <li>
          <a href="#" className=" italic block py-2 px-3 text-black rounded text-xl  md:hover:text-white  md:hover:bg-transparent md:border-0  md:p-0">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div>
<div className="flex justify-around items-center text-center h-screen">
<div className="flex flex-col space-y-6">
  <span className=" italic text-3xl font-extrabold md:text-5xl lg:text-6xl text-white  ">WELCOME</span>
  <span className='italic text-xl text-black'>Your home away from home!</span>
  <button className="w-full flex justify-center items-center px-4 py-2 bg-white text-black font-semibold  hover:bg-transparent border-black duration-300 ease-in-out  ">
    Get Started
  </button>
</div>

 
</div>

  </div>


</div>
  )
}
