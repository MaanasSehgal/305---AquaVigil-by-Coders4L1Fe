"use client";
import React, {useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {LogoutUser, ToggleOpen} from "@/redux/slices/Auth";
import {useRouter, usePathname} from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import EmployeeListSidebar from "./EmployeeListSidebar";
import dynamic from "next/dynamic";
import Link from "next/link";

const MessageSnackbar = dynamic(() => import("@/app/components/MessageSnackbar"), {ssr: false});

const Sidebar = ({selectedCriteria, setSelectedCriteria, setDate, setSelectedStatus}) => {
    const user = useSelector((state) => state.auth.user);
    const onEmployeeListView = useSelector((state) => state.admin.onEmployeeListView);
    const [logoutOpen, setLogoutOpen] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const path = pathname.split("/");

    const handleLogout = () => {
        setLogoutOpen(true);
        dispatch(ToggleOpen());
        router.replace("/signin");
        dispatch(LogoutUser());
    };

    let Home = true;
    if (pathname === "/user/complaintform" || path.at(-1) === "status" || path.at(-1) === "profile" || path.at(-1) === "chat") Home = false;

    return (
        <div className="sidebar relative w-[18vw] ml-3 flex flex-col items-center justify-center gap-1 h-screen">
            <div className="">
                <div className="absolute top-[5%] left-[12%] flex items-center gap-2">
                    <Image src="/logo.svg" alt="Vercel Logo" className=" w-[2vw]" width={200} height={46} priority />
                    <Link href="/" className="text-black font-medium text-xl">AquaVigil</Link>
                </div>
            </div>
            {pathname.startsWith("/user") && (
                <div className="flex flex-col items-center justify-center">
                    <div
                        className={`w-[14vw] h-[5vh] flex items-center justify-start p-4 rounded-md ${Home ? "text-white bg-[#7B94F6]" : "hover:bg-gray-300"} cursor-pointer`}
                        onClick={() => router.push(`/user/${user.token}`)}>
                        <Image src="/House.svg" alt="Vercel Logo" className=" w-[1.3vw]" width={200} height={46} priority />
                        <h3 className="ml-1">Home</h3>
                    </div>
                    <div
                        className={`w-[14vw] h-[5vh] flex items-center justify-start p-4 mt-2 rounded-md text-[#3A4264] ${
                            pathname === "/user/complaintform" && "text-white bg-[#7B94F6]"
                        } cursor-pointer hover:bg-gray-300`}
                        onClick={() => router.push("/user/complaintform")}>
                        <Image src="/Complaint.png" alt="Vercel Logo" className=" w-[1.3vw]" width={200} height={46} priority />
                        <h3 className="ml-1">Complaint</h3>
                    </div>
                    <div
                        onClick={() => router.push(`/user/${user?.token}/status`)}
                        className={`w-[14vw] h-[5vh] flex items-center justify-start p-4 mt-2 rounded-md ${
                            path.at(-1) === "status" && "text-white bg-[#7B94F6]"
                        } text-[#3A4264] cursor-pointer hover:bg-gray-300`}>
                        <Image src="/ListChecks.svg" alt="Vercel Logo" className=" w-[1.3vw]" width={200} height={46} priority />
                        <h3 className="ml-1">Status</h3>
                    </div>
                    <div
                        className={`w-[14vw] h-[5vh] flex ${
                            pathname === "/user/profile" && "text-white bg-[#7B94F6]"
                        } items-center justify-start p-4 mt-2 rounded-md text-[#3A4264] cursor-pointer hover:bg-gray-300`}>
                        <Image src="/User.svg" alt="Vercel Logo" className=" w-[1.3vw]" width={200} height={46} priority />
                        <h3 className="ml-1">Profile</h3>
                    </div>

                    <div
                        className={`w-[14vw] h-[5vh] flex ${
                            path.at(-1) === "chat" && "text-white bg-[#7B94F6]"
                        } items-center justify-start p-4 mt-2 rounded-md text-[#3A4264] cursor-pointer hover:bg-gray-300`}
                        onClick={() => router.push(`/user/${user?.token}/chat`)}>
                        <Image src="/User.svg" alt="Vercel Logo" className=" w-[1.3vw]" width={200} height={46} priority />
                        <h3 className="ml-1">Chatbot</h3>
                    </div>
                </div>
            )}

            {pathname === "/admin" &&
                (onEmployeeListView ? (
                    <EmployeeListSidebar />
                ) : (
                    <AdminSidebar selectedCriteria={selectedCriteria} setSelectedCriteria={setSelectedCriteria} setDate={setDate} setSelectedStatus={setSelectedStatus} />
                ))}
            <div className="fixed bottom-12 ">
                <div onClick={handleLogout} className="w-[14vw] h-[5vh] flex items-center justify-start p-4 mt-2 rounded-md text-[#3A4264] cursor-pointer hover:bg-gray-300">
                    <Image src="/SignOut.svg" alt="Vercel Logo" className=" w-[1.3vw]" width={200} height={46} priority />
                    <h3 className="ml-1">Logout</h3>
                </div>
            </div>
            <MessageSnackbar open={logoutOpen} message="Logout Successful!" autoHideDuration={5000} severity={"error"} />
        </div>
    );
};

export default Sidebar;
