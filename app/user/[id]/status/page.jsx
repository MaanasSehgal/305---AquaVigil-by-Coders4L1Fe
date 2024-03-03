"use client"
import ListView from "@/app/components/ListView"
import Sidebar from "@/app/components/Sidebar"
import TopBar from "@/app/components/TopBar"
import { getAllComplaintsById } from "@/app/services/operationUser/getAllComplaintAPI"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const UserComplaintStatusPage = () => {
  const [complaintList, setComplaintList] = useState([])
  const user = useSelector((state) => state.auth.user)

  async function fetchComplaints() {
    const response = await getAllComplaintsById(user?.token);
    console.log("Complaints Response: ", response);
    if (response?.success) {
      const data = response?.result;
      setComplaintList(data);
      console.log("Complaints: ", complaintList);
    }
  }

  useEffect(() => {
    fetchComplaints();
  }, [])
  return (
    <div className="flex items-center justify-center gap-3 overflow-y-hidden bg-[#F5F7FD]">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-[79vw] h-screen flex flex-col items-center p-2 justify-evenly">
        <TopBar />
        <ListView complaintList={complaintList} />
      </div>
    </div>
  )
}

export default UserComplaintStatusPage
