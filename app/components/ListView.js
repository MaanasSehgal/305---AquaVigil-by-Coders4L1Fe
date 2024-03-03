"use client";
import React, {useState} from "react";
import ComplaintModal from "./ComplaintModal";
import {usePathname} from "next/navigation";

const ListView = ({complaintList}) => {
    const [info, setInfo] = useState(false);
    const pathname = usePathname();
    const [complaint, setComplaint] = useState(null);
    const handleModalOpening = (comp) => {
        setComplaint(comp);
        setInfo(true);
    };
    return (
        <div className="w-[79vw] h-[80.0vh] flex flex-col relative gap-2 justify-center bg-white rounded-lg">
            {info && (
                <div className={`z-50 absolute flex justify-center items-center w-full h-full top-0 left-0 ${info ? "backdrop-blur-xl" : "backdrop-blur-none"}`}>
                    <div className="flex flex-row justify-start gap-4">
                        <ComplaintModal
                            complaint={complaint}
                            //   setEmployeeListView={setEmployeeListView}
                        />
                        <div
                            className="text-white h-12 cursor-pointer border-2 border-white p-2 rounded-md bg-red-500 hover:bg-red-600 transition-all duration-200 ease-in-out"
                            onClick={() => setInfo(false)}>
                            Close
                        </div>
                    </div>
                </div>
            )}
            <div className="w-[76vw] h-[7vh] flex justify-evenly text-[#728ABF]">
                <p className="w-[10.17%] flex items-center justify-start">NAME</p>
                <p className="w-[10.17%] flex items-center justify-start">DATE</p>
                <p className="w-[10.17%] flex items-center justify-start">CATEGORY</p>
                <p className="w-[10.17%] flex items-center justify-start">ADDRESS</p>
                <p className="w-[20.35%] flex items-center justify-start">DESCRIPTION</p>
                <p className="w-[10.17%] flex items-center justify-start">STATUS</p>
            </div>

            <div className=" h-[1px] w-[76vw] bg-[#728ABF] mx-auto mt-[-2px]"></div>

            <div className="w-[76vw] flex flex-col gap-[8px] h-[75vh] font-semibold overflow-y-scroll overflow-x-hidden">
                {complaintList?.length > 0 &&
                    complaintList.map((complaint, index) => (
                        <div key={index} className="flex h-[5vh] max-h-[5vh] text-[#3A4264] justify-evenly items-center w-[76vw]" onClick={() => handleModalOpening(complaint)}>
                            <p className="w-[10.17%] flex items-center justify-start">{complaint?.user?.name}</p>
                            <p className="w-[10.17%] flex items-center justify-start">{complaint?.date}</p>
                            <p className="w-[10.17%] flex items-center justify-start">{complaint?.category}</p>
                            <p className="w-[10.17%] flex items-center justify-start">{complaint?.address.slice(0, 15)}</p>
                            <p className="w-[20.35%] flex items-center justify-start">{complaint?.description.slice(0, 15)}...</p>
                            <div className="w-[10.17%] flex items-center justify-start gap-2">
                                <div
                                    className={`h-[24px] w-[24px] rounded-full ${
                                        complaint?.status === "assigned" ? "bg-[#05CD99]" : complaint?.status === "not assigned" ? "bg-[#05CD99]" : "bg-[#EE5D50]"
                                    }`}></div>
                                {complaint?.status}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListView;
