import React from 'react'
import Sidebar from '../components/Sidebar'
import Image from "next/image";
const page = () => {
  return (
    <div className="flex items-center justify-center gap-3 overflow-y-hidden">
       <div className="">
         <Sidebar />
       </div>
       <div className="w-[38vw] h-screen flex items-center p-2 justify-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-6">
                <h2 className='text-[#272324] font-extrabold text-4xl'>Welcome to AquaVigil</h2>
                 <p className='text-[#8DA6CD]'>We are glad you have chosen to reach out to us regarding any water-related issues you may be experiencing. </p>
                 <p className='text-[#8DA6CD]'>Your concerns are important to us, and our dedicated team is here to assist you in resolving them promptly and efficiently.</p>
            </div>
            <div className="flex items-center justify-center gap-4">
            <a href="/complaintform"><button className="w-[15vw] h-[6vh] bg-[#234DF0] p-5 text-white flex items-center justify-center rounded-lg mt-3" type="submit">File Complaint</button></a>
            <button className="w-[15vw] h-[6vh] text-[#234DF0] border-[#234DF0] border-2 p-5 flex items-center justify-center rounded-lg mt-3" type="submit">Check Status</button>
            </div>
          </div>
       </div>
       <div className=" w-[46vw] h-screen bg-[#F5F7FD]">
         <div className="flex flex-col items-center justify-center h-screen">
             <Image src="/comp_page_img.svg" alt="Google Logo" className="w-[40vw]" width={50} height={10} priority />
         </div>
     </div>
    </div>
  )
}

export default page