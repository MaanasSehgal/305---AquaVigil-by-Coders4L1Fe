import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="w-full h-[3vh] flex items-center justify-between poppins-bold">
            <div className="w-[130px] h-[3vh] flex gap-[8px] items-center">
                <Image src="/logo.svg" width={30} height={30} alt="logo" />
                <Link href="/" className="text-[24px] font-bold">
                    AquaVigil
                </Link>
            </div>
            <div className="w-[320px] h-[20px] flex items-center justify-between gap-3 m-2">
                <p className="text-[17px] font-bold text-[#D89314] cursor-pointer">Home</p>
                <p className="text-[17px] font-bold text-[#262626] cursor-pointer">About Us</p>
                <p className="text-[17px] font-bold text-[#262626] cursor-pointer">Contact</p>
                <Link href="/features" className="text-[17px] font-bold text-[#D89314] cursor-pointer">Features</Link>
            </div>
        </div>
    );
};

export default Navbar;
