"use client";
import React from "react";
import Image from "next/image";
import {useSelector} from "react-redux";
import {useState} from "react";
import SettingCard from "./SettingCard";

const TopBar = ({setIsListView, isListView}) => {
    const [showSettings, setShowSettings] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const handleSettingsClick = () => {
        setShowSettings(!showSettings);
    };
    return (
        <div className="h-[8vh] w-[79vw] flex justify-between px-[2vw] items-center bg-white rounded-lg">
            <div className="w-[12.22vw] h-[5vh] flex gap-2 items-center cursor-pointer transition-all duration-200">
                <Image src="/user.png" width={30} height={30} className="h-[44px] w-[44px] rounded-full"></Image>
                <div className="flex flex-col h-[44px] w-[8.75vw] justify-between">
                    <p className="text-[#3A4264] font-semibold">{user?.name}</p>
                    <p className="text-[#8DA6CD] text-xs">{user?.type}</p>
                </div>
            </div>

            <div className="h-[5vh] w-[36vw] flex gap-[30px]">
                <div className="w-[19.58vw] h-[5vh] flex items-center justify-between">
                    <div className="w-[10.14vw] h-[5vh] flex gap-2 justify-center items-center rounded-md border-[1px] border-gray-200 cursor-pointer transition-all duration-200">
                        <div className="h-[20px] w-[20px]">
                            <Image src="/Calendar.png" alt="calendar" width={20} height={20} />
                        </div>
                        <p className="h-[12px] w-[100px] text-[12px]">{new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="w-[5vh] h-[5vh] flex gap-2 justify-center items-center rounded-md border-[1px] border-gray-200 ml-10 cursor-pointer transition-all duration-200">
                        <div className="h-[20px] w-[20px] relative" onClick={handleSettingsClick}>
                            <Image src="/settings.png" alt="settings" width={20} height={20} />
                            {showSettings && (
                                <div className=" absolute left-10">
                                    {" "}
                                    <SettingCard />{" "}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-[5vh] h-[5vh] flex gap-2 justify-center items-center rounded-md border-[1px] border-gray-200 cursor-pointer transition-all duration-200">
                        <div className="h-[20px] w-[20px]">
                            <Image src="/bell.png" alt="noti" width={20} height={20} />
                        </div>
                    </div>
                </div>

                {setIsListView && (
                    <div className="w-[14.166vw] h-[5vh] flex gap-2 justify-center items-center rounded-md border-[1px] border-gray-200 cursor-pointer transition-all duration-200">
                        <div
                            className={`w-[6.875vw] h-[5vh]  font flex justify-center items-center ${isListView ? "bg-[#7B94F6] text-white" : "bg-[#fff] text-[#3A4264]"} rounded-md`}
                            onClick={() => setIsListView(true)}>
                            <p className="text-[15px]">List View</p>
                        </div>
                        <div
                            className={`w-[6.875vw] h-[5vh]  font flex justify-center items-center ${isListView ? "bg-[#fff] text-[#3A4264]" : "bg-[#7B94F6] text-white"} rounded-md`}
                            onClick={() => setIsListView(false)}>
                            <p className="text-[15px]">Map View</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;

