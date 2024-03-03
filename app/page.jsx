"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import {useRouter} from "next/navigation";

const MainPage = () => {
    const router = useRouter();
    return (
        <div className="w-[100vw] h-full pt-10">
            <div className="max-w-[1080px] w-10/12 h-fit mx-auto">
                <Navbar />
                <div className="w-full h-full flex items-center justify-between py-24">
                    <div className="w-[500px] h-[300px] flex flex-col gap-y-[40px]">
                        <h1 className="text-[54px] font-bold text-[#292D42]">
                            Your <span className="text-[#234DF0]">Water</span> Concerns Matter
                        </h1>
                        <p className="text-[#495384] font-medium tracking-[2%] text-[14px] leading-[120%]">
                            We're here to listen and resolve your water concerns promptly. Your input fuels our efforts. Let's work together for a brighter, safer community. Share your concerns now.
                        </p>
                        <div className="flex gap-x-[12px] w-[370px] h-[50px] justify-between items-center">
                            <button
                                onClick={() => router.push("/signup")}
                                className="w-[179px] hover:bg-white hover:border-[1px] hover:border-[#234DF0] hover:text-[#234DF0] transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-slate-600 h-[50px] flex justify-center items-center bg-[#234DF0] rounded-md text-white font-semibold">
                                Sign Up
                            </button>
                            <button
                                onClick={() => router.push("/signin")}
                                className="w-[179px] hover:bg-white hover:border-[1px] hover:border-[#234DF0] hover:text-[#234DF0] transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-slate-600 h-[50px] flex justify-center items-center bg-[#234DF0] rounded-md text-white font-semibold">
                                Sign In
                            </button>
                        </div>
                    </div>

                    <Image src="/bannerImage3.png" width={400} height={400} alt="hero" className="rounded" />
                </div>

                <div className="w-full h-full flex items-center justify-between py-24">
                    <Image src="/waterearth.jpg" width={400} height={400} alt="hero rounded-full" />
                    <div className="w-[500px] h-[300px] flex flex-col gap-y-[40px]">
                        <h1 className="text-[54px] font-bold text-[#292D42]">
                            <span className="text-[#234DF0]">About</span> Us
                        </h1>
                        <p className="text-[#495384] font-medium tracking-[2%] text-[14px] leading-[120%]">
                            At Aquavigil, we are dedicated to ensuring the availability of clean and safe water for all. With a team of passionate experts, we strive to address water-related issues
                            promptly and effectively. Our commitment to excellence and community welfare drives us to continuously improve and innovate. Together, let's make a positive impact on our
                            environment and the lives of people. Join us in our mission for a sustainable future.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full h-[300px] flex items-center justify-evenly py-24 px-[80px] bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="w-[280px] h-[67px] flex gap-[8px] items-center  font-serif">
                    <p className="text-[44px] font-semibold text-white">AquaVigil</p>
                </div>
                <div className="w-[422px] h-[140px] flex justify-between font-serif">
                    <div className="w-[160px] h-full flex flex-col justify-between font-serif">
                        <div className="w-[160px] h-[50px] flex flex-col justify-between">
                            <p className="text-[12px] font-bold leading-4">Follow us on</p>
                            <div className="flex justify-between h-[25px]">
                                <div className="w-[25px] h-[25px] rounded-full flex justify-center items-center text-white font-bold bg-[#25397b] shadow-sm shadow-black">
                                    <Image src="/facebook.png" width={15} height={15} alt="facebook" />
                                </div>
                                <div className="w-[25px] h-[25px] rounded-full flex justify-center items-center text-white font-bold bg-[#25397b] shadow-sm shadow-black">
                                    <Image src="/Instagram.png" width={15} height={15} alt="instagram" />
                                </div>
                                <div className="w-[25px] h-[25px] rounded-full flex justify-center items-center text-white font-bold bg-[#25397b] shadow-sm shadow-black">
                                    <Image src="/ph_twitter-logo-fill.png" width={15} height={15} alt="twitter" />
                                </div>
                            </div>
                        </div>
                        <button className="w-[160px] hover:bg-white hover:border-[1px] hover:border-[#234DF0] hover:text-[#234DF0] transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-slate-600 h-[50px] flex justify-center items-center bg-[#234DF0] rounded-md text-white font-semibold">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
