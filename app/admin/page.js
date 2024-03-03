"use client";
import React, {useEffect, useState} from "react";
import ListView from "../components/ListView";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import GoogleMaps from "../components/LocationPicker";
import EmployeeList from "../components/EmployeeList";
import {useSelector} from "react-redux";
import {getAllcomplaints} from "../services/operationUser/getAllComplaintAPI";

const AdminPage = () => {
    const user = useSelector((state) => state.auth.user);
    const [isListView, setIsListView] = useState(true);
    const [complaints, setComplaints] = useState([]);
    const [employeeListView, setEmployeeListView] = useState(false);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [selectedCriteria, setSelectedCriteria] = useState([]);
    const [date, setDate] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null)

    async function fetchComplaints() {
        // console.log("User in admin page: ", user);
        const response = await getAllcomplaints(user?.token);
        // console.log("Complaints Response: ", response);
        if (response?.success) {
            const data = response?.result;
            setComplaints(data);
            // console.log("Complaints: ", complaints);
        }
    }

    useEffect(() => {
        fetchComplaints();
    }, []);

    // //filtering
    // useEffect(() => {
    //     console.log(selectedCriteria);
    //     if (selectedCriteria.length === 0) {
    //         setFilteredComplaints(complaints);
    //     } else {
    //         const filteredData = complaints.filter((complaint) => {
    //             return selectedCriteria.some((criteria) => complaint.category === criteria);
    //         });
    //         setFilteredComplaints(filteredData);
    //     }
    //     if (date != NaN && date != "") {
    //         const filteredData = complaints.filter((complaint) => {
    //             return complaint.date === date;
    //         });
    //         setFilteredComplaints(filteredData);
    //     } 
    // }, [selectedCriteria, complaints, date]);

    useEffect(() => {
        // console.log(selectedCriteria, date);
        let filteredData = complaints;

        if (selectedCriteria.length > 0) {
            filteredData = filteredData.filter((complaint) => selectedCriteria.some((criteria) => complaint.category === criteria));
        }

        if (date && date !== "Invalid Date") {
            filteredData = filteredData.filter((complaint) => complaint.date === date);
        }

        if (selectedStatus) {
            filteredData = filteredData.filter((complaint) => complaint.status === selectedStatus.replace(" ", ""));
        }

        setFilteredComplaints(filteredData);
    }, [selectedCriteria, complaints, date]);


    console.log("Selected Criteria: ", selectedCriteria);
    console.log("All complaints: ", complaints);
    console.log("Filtered data: ", filteredComplaints);
    console.log("Date in admin page: ", date);
    console.log("Status in admin page:",selectedStatus?.replace(" ", ""));

    return (
        <div className="flex items-center justify-center gap-3 overflow-y-hidden bg-[#F5F7FD]">
            <div className="">
                <Sidebar selectedCriteria={selectedCriteria} setSelectedCriteria={setSelectedCriteria} setDate={setDate} setSelectedStatus={setSelectedStatus}/>
            </div>
            <div className="w-[79vw] h-screen flex flex-col items-center p-2 justify-evenly">
                <TopBar setIsListView={setIsListView} isListView={isListView} />
                {employeeListView ? (
                    <EmployeeList setEmployeeListView={setEmployeeListView} />
                ) : isListView ? (
                    <ListView complaintList={filteredComplaints.length > 0 ? filteredComplaints : complaints} setEmployeeListView={setEmployeeListView} />
                ) : (
                    // <EmployeeList />
                    <GoogleMaps isAdminPage={true} compplaintsData={complaints} setEmployeeListView={setEmployeeListView} />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
