"use client";
import Sidebar from "@/app/components/Sidebar";
import { getAllcomplaints } from "@/app/services/operationUser/getAllComplaintAPI";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CaretLeft,
  CaretRight,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const UserPage = () => {
  const router = useRouter()
  const user = useSelector((state) => state.auth.user);
  console.log("User: ", user);
  const handleButtonClick = (path) => {
    router.push(path);
  }

  const [complaints, setComplaints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchComplaints() {
    const response = await getAllcomplaints(user?.token);
    console.log("Complaints Response: ", response);
    if (response?.success) {
      const data = response?.result;
      setComplaints(data);
      console.log("Complaints: ", complaints);
    }
  }

  useEffect(() => {
    fetchComplaints();
  }, [])

  
  const handleRightButtonClick = () => {
    setCurrentIndex((prev) => (prev + 1) % complaints.length);
    console.log("Current Index: ", currentIndex);
  }

  const handleLeftButtonClick = () => {
    setCurrentIndex((prev) => (prev - 1 + complaints.length) % complaints.length);
    console.log("Current Index: ", currentIndex);
  }


  return (
    <>
      <div className="flex items-center justify-center gap-3 overflow-y-hidden">
        <div className="">
          <Sidebar />
        </div>
        <div className="complaint_form w-[38vw] bg-[#F5F7FD] h-screen flex items-start mt-0 justify-center py-4">
          <div className="ml-9">
            <div className="flex flex-col">
              <h1 className="text=[#292D42] font-bold text-3xl text-[#3A4264] mb-1">
                Welcome to AquaVigil
              </h1>
              <br />
              <p className="text-[#8DA6CD] poppins-light">
                We're glad you've chosen to reach out to us regarding any
                water-related issues you may be experiencing. <br /> Your
                concerns are important to us, and our dedicated team is here to
                assist you in resolving them promptly and efficiently.
              </p>
              <div className="flex gap-x-[12px] w-[370px] h-[50px] justify-between items-center mt-8">
                  <button onClick={ () => handleButtonClick("/user/complaintform") } className="w-[179px] hover:bg-white hover:border-[1px] hover:border-[#234DF0] hover:text-[#234DF0] transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-slate-600 h-[50px] flex justify-center items-center bg-[#234DF0] rounded-md text-white font-semibold">
                    File a Complaint
                  </button>
                <button onClick={ () => handleButtonClick(`/user/${user?.token}/status`) } className="w-[179px] hover:bg-white hover:border-[1px] hover:border-[#234DF0] hover:text-[#234DF0] transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-slate-600 h-[50px] flex justify-center items-center bg-[#234DF0] rounded-md text-white font-semibold">
                  Check Status
                </button>
              </div>
              <div className="">
                <div
                  className={`h-[300px] shadow-[0_0px_10px_rgba(0,0,0,0.25)] w-[500px] rounded-3xl border-[2px] bg-transparent backdrop-blur-[10px] mt-10 hover:cursor-pointer`}
                >
                  <div className="flex ">
                    <div className="w-[400px] h-[300px]">
                      <div className="h-[100px] flex justify-center items-center">
                        <p className="font-bold text-[#3A4264] text-[25px] border-b-[2px] py-1">
                          {/* Blockage */}
                          {complaints?.length > 0 && complaints[currentIndex]?.category}
                        </p>
                      </div>
                      <p className="flex justify-start text-justify h-[150px] overflow-y-scroll  px-4 text-sm">
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.... */}
                        {
                          complaints?.length > 0 && complaints[currentIndex]?.description
                        }
                      </p>
                    </div>
                    <div className="justify-center rounded-2xl items-center w-[200px] flex h-[300px] p-2">
                      <Image
                        src={complaints?.length > 0 ? complaints[currentIndex]?.imageUrl : "/blockage.png"}
                        alt="complaint image"
                        width={200}
                        height={300}
                        className="complaint-image"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="pagination">
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-[40px] hover:scale-105 transition-all duration-150 h-[40px] rounded-full flex items-center justify-center text-white font-extrabold cursor-pointer bg-[#234DF0]" onClick={handleLeftButtonClick}>
                      <CaretLeft />
                    </div>
                    <div className="w-[8px] h-[8px] bg-[#234DF0] rounded-full"></div>
                    <div className="w-[8px] h-[8px] bg-[#E5EAF4] rounded-full"></div>
                    <div className="w-[8px] h-[8px] bg-[#E5EAF4] rounded-full"></div>
                    <div className="w-[40px] hover:scale-105 transition-all duration-150 h-[40px] rounded-full flex items-center justify-center text-white font-extrabold cursor-pointer bg-[#234DF0]" onClick={handleRightButtonClick}>
                      <CaretRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[46vw] h-screen">
          <div className="flex flex-col items-center justify-center h-[100%]">
            <p className="text-[#3A4264] mb-3 font-extrabold text-xl">
              Welcome <span className="text-[#234DF0]">{user?.name}</span>.
            </p>
            <Image
              src="/UserPageImage.svg"
              alt="Google Logo"
              className="w-[33vw] h-[52vh]"
              width={5}
              height={10}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
