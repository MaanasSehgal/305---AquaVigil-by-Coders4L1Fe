"use client";
import React from "react";
import Image from "next/image";
import {useSelector} from "react-redux";

const EmployeeListSidebar = () => {
    const complaint = useSelector((state) => state.admin.complaint);
    const employees = useSelector((state) => state.admin.employees);
    let {imageUrl, category, date, phone, address} = complaint;

    return (
        <div className="w-[18vw] max-h-[100vh] h-[80vh] mt-20 overflow-y-hidden overflow-x-hidden bg-white flex flex-col items-center justify-start gap-2 border-2 rounded-md ">
            <div className="w-[16.875vw] h-[20vh] object-cover relative">
                <Image src={imageUrl} alt="img" className="h-[20vh] rounded-xl " width={600} height={16} priority />
            </div>
            <div className="w-[16vw] flex flex-row">
                <h2 className="font-semibold text-sm">Category: &nbsp;</h2>
                <p className="text-[#3A4264] text-sm">{category}</p>
            </div>
            <div className=" w-[16.875vw] h-[47vh] flex flex-col items-start justify-center p-1 gap-2 px-4">
                <div className="flex flex-col justify-center gap-2">
                    <div className="">
                        <h2 className="font-semibold text-sm mt-4">{complaint.user.name}</h2>
                        <br />
                        <p className="text-[8px]">Complaint Date - {date}</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Image src="/call.svg" alt="Vercel Logo" className=" w-[1.5vw] " width={200} height={46} priority />
                        <p className="text-[8px]">{phone}</p>
                    </div>
                </div>
                <hr className="bg-[#E5EAF4] w-[100%]" />
                <div className="w-[16vw] p-1">
                    <h2 className="font-semibold text-sm">Address</h2>
                    <p className="text-[#3A4264] mt-2 text-xs">{address}</p>
                </div>
                <hr className="bg-[#E5EAF4] w-[100%]" />
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-[16vw] max-h-40 overflow-y-scroll">
                        <ul>
                            {employees.map((employee, index) => (
                                <ul key={index}>{employee.name}</ul>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeListSidebar;
