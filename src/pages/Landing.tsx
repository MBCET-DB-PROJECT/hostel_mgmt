import { Span } from 'next/dist/trace'
import Image from 'next/image'
import "tailwindcss/tailwind.css";

export default function Landing() {
  return (
    <div>
    <div className=" bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url(https://hostel-gentileza.hoteis-em-goias.com/data/Images/OriginalPhoto/12056/1205674/1205674189/image-alto-paraiso-de-goias-hostel-gentileza-13.JPEG)' }}>
<div className="z-10 flex justify-center w-full h-full text-black  items-center ">
      <div className="md:w-[80%] w-[95%] h-full  bg-white m-2 z-2 rounded-full shadow-md text-slate-800 font-semibold">
        <div className="flex items-center justify-between">
          <div className="flex gap-6  p-5 ">
            
            <label className="md:flex hidden">HOME</label>
            <label className="md:flex hidden">CONTACT</label>
            <label className="md:flex hidden">ABOUT</label>
          </div>
          <div className="flex gap-6 px-5">
           
            <button title="Signup" className="bg-black py-3 px-6 rounded-full text-white">LOG IN</button>
          </div>
        </div>
      </div>
    </div>
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
<div className="h-screen">
  <div className="h-full">
    
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
      <div
        className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="w-full"
          alt="Sample image" />
      </div>

    
      
  </div>
</div>

</div>
</div>
  )
}
