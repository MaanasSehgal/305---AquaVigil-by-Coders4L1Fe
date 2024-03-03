"use client";
import React, {useEffect, useState} from "react";
import {getAllEmployees} from "../services/operationAdmin/getAllEmployeesAPI";
import {useDispatch, useSelector} from "react-redux";
import {modifyComplaint} from "../services/operationAdmin/modifyComplaintAPI";
import {SetEmployees, SetOnEmployeeListView} from "@/redux/slices/Admin";
import dynamic from "next/dynamic";

const MessageSnackbar = dynamic(() => import("@/app/components/MessageSnackbar"), {ssr: false});

const EmployeeList = ({setEmployeeListView}) => {
    const complaint = useSelector((state) => state.admin.complaint);
    const [employeeAssignOpen, setEmployeeAssignOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [employees, setEmployees] = useState([]);
    const [addedEmployees, setAddedEmployees] = useState([]);
    const dispatch = useDispatch();

    async function fetchEmployees() {
        let res = await getAllEmployees(user?.token);
        if (res) {
            setEmployees(res.result);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleFilteredEmployees = (idx) => {
        if (!addedEmployees.includes(employees[idx])) setAddedEmployees((prevAddedEmployees) => [...prevAddedEmployees, employees[idx]]);
        dispatch(SetEmployees(addedEmployees));
    };

    const handleRemove = (idx) => {
        setAddedEmployees((previousAddedEmployees) => previousAddedEmployees.filter((employee, index) => employee._id !== employees[idx]._id));
    };

    async function handleSubmit() {
        if (complaint && addedEmployees.length > 0) {
            const res = await modifyComplaint(user?.token, {
                complaintId: complaint._id,
                status: "assigned",
                employeeIdArray: addedEmployees,
            });

            if (res.success) {
                setEmployeeAssignOpen(true);
                console.log("complaint modified successfully");
                setEmployeeListView(false);
                dispatch(SetOnEmployeeListView(false));
            }
        }
    }

    useEffect(() => {
        dispatch(SetEmployees(addedEmployees));
    }, [addedEmployees]);

    console.log(addedEmployees);

    return (
        <div className="w-[79vw] h-[80.0vh] flex flex-col gap-2 justify-center bg-white rounded-lg">
            <div className="w-[76vw] h-[7vh] flex justify-evenly text-[#728ABF]">
                <p className="w-[10.17%] flex items-center justify-start">EMP ID</p>
                <p className="w-[10.17%] flex items-center justify-start">NAME</p>
                <p className="w-[20.35%] flex items-center justify-start">ASSIGNED LOCATION</p>
                <p className="w-[10.17%] flex items-center justify-start">STATUS</p>
                <div className="w-[10.35%]"></div>
            </div>

            <div className=" h-[1px] w-[76vw] bg-[#728ABF] mx-auto mt-[-2px]"></div>

            <div className="w-[76vw] flex flex-col gap-[8px] h-[75vh] font-semibold overflow-y-scroll overflow-x-hidden">
                {employees.map((employee, index) => (
                    <div key={index} className="flex h-[5vh] text-[#3A4264] justify-evenly items-center w-[76vw]">
                        <p className="w-[10.17%] flex items-center justify-start">{`E${index + 1}`}</p>
                        <p className="w-[10.17%] flex items-center justify-start">{employee.name}</p>
                        <p className="w-[20.35%] flex items-center justify-start">{employee.location}</p>
                        {addedEmployees.includes(employee) ? (
                            <p className="w-[10.17%] flex items-center justify-start gap-2 cursor-pointer" onClick={() => handleRemove(index)}>
                                <div className={`h-[24px] w-[24px] rounded-full bg-[hsl(0,55%,50%)] cursor-pointer`}></div>
                                Remove
                            </p>
                        ) : (
                            <p className="w-[10.17%] flex items-center justify-start gap-2">
                                <div className={`h-[24px] w-[24px] rounded-full bg-[#05CD99] cursor-pointer`}></div>
                                Available
                            </p>
                        )}

                        <div
                            // onClick={() => setEmployeeListView(false)}
                            onClick={() => handleFilteredEmployees(index)}
                            className="w-[10.35%] flex items-center justify-center border-[1px] text-[#234DF0] rounded-md border-[#234DF0] cursor-pointer">
                            Assign
                        </div>
                    </div>
                ))}

                <button
                    // onClick={() => setEmployeeListView(false)}
                    onClick={handleSubmit}
                    className="w-[10.35%] mx-auto flex items-center justify-center border-[1px] text-[#fff] rounded-md bg-[#234DF0] cursor-pointer">
                    Assign
                </button>
            </div>
            <MessageSnackbar open={employeeAssignOpen} message="Employees Assigned Successfully!" autoHideDuration={5000} severity={"success"} />
        </div>
    );
};

export default EmployeeList;
