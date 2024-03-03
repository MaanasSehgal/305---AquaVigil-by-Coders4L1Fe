"use client";
import Sidebar from "@/app/components/Sidebar";
import {getResponse} from "@/app/services/operationUser/chatbotAPI";
import {uploadImage} from "@/app/services/users/imageUpload";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {IoMdSend} from "react-icons/io";
import {useSelector} from "react-redux";

const Chatbot = () => {
    const user = useSelector((state) => state.auth.user);
    const [value, setValue] = useState(null);
    const [message, setMessage] = useState(null);
    const [previousChats, setPreviousChats] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const createNewChat = () => {
        setMessage(null);
        setValue("");
        setCurrentTitle(null);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        // Check if the file is an image
        if (!file.type.startsWith("image/")) {
            console.error("Please select an image file.");
            setImageError(true);
            return;
        }

        console.log("Uploaded file:", file);

        // Create a new File object with the modified name
        const modifiedFile = new File([file], `${Date.now()}${Math.random()}complaintImage.jpg`.replace(".", ""), {type: file.type});

        const imageResult = await uploadImage(modifiedFile);
        console.log("Image Result: ", imageResult);
        setImageURL(imageResult.imageUrl);
        console.log("Image Url: ", imageResult.imageUrl);
    };

    const getMessages = async () => {
        try {
            const response = await getResponse(user?.token, imageURL, value);
            const data = response.result;
            console.log("Datatata: ", data);
            setMessage(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickToSetCurrentTitle = (title) => {
        setCurrentTitle(title);
        setMessage(null);
        setValue("");
    };

    useEffect(() => {
        console.log(currentTitle, value, message);
        if (!currentTitle && value && message) {
            setCurrentTitle(value);
        } else if (currentTitle && value && message) {
            setPreviousChats((prevChats) => [
                ...prevChats,
                {
                    title: currentTitle,
                    role: "user",
                    content: value,
                },
                {
                    title: currentTitle,
                    role: "bot",
                    content: message,
                },
            ]);
        }
    }, [message, currentTitle]);

    console.log(previousChats);

    const currentChat = previousChats.filter((prevChats) => prevChats.title === currentTitle);
    const uniquetitles = Array.from(new Set(previousChats.map((prevChats) => prevChats.title)));

    console.log(uniquetitles);

    return (
        <div className="flex items-center justify-center gap-3 overflow-y-hidden bg-[#F5F7FD]">
            <div className="">
                <Sidebar />
            </div>
            <div className="w-[84vw] h-screen flex flex-col items-center justify-evenly">
                <div className="app bg-[#212121da] flex my-5 w-full mx-auto">
                    <div className="side-bar bg-[#202123] h-[100vh] w-[244px] flex flex-col justify-between">
                        <button onClick={createNewChat} className="border border-solid text-white border-white border-opacity-50 bg-transparent rounded-[5px] p-[10px] m-[10px]">
                            + New Chat
                        </button>
                        <ul className="history p-[10px] m-[10px] h-[100%] max-h-[calc(100vh - 45px)] overflow-y-scroll scrollbar-hide">
                            {uniquetitles?.map((uniquetitle, index) => (
                                <li className="py-[15px] px-0 text-white font-semibold" key={index} onClick={() => handleClickToSetCurrentTitle(uniquetitle)}>
                                    {uniquetitle.slice(0, 15) + "..."}
                                </li>
                            ))}
                        </ul>

                        <nav className=" border-t-[0.5px] text-white text-center border-white border-solid p-[10px] m-[10px]">
                            <p>AquaVigil Chatbot</p>
                        </nav>
                    </div>
                    <div className="main h-[100vh] w-[100%] flex flex-col justify-between items-center text-center pt-5">
                        {!currentTitle && <h1 className="text-3xl text-white font-bold">Chatbot</h1>}
                        <ul className="feed flex flex-col gap-y-3 w-full overflow-y-scroll max-h-[70vh] scrollbar-hide p-10">
                            {currentChat.map((chatMessage, index) => (
                                <li key={index} className={`flex gap-x-3 w-full ${chatMessage.role === "user" ? " items-center justify-start" : " items-center justify-end"}`}>
                                    <div className={`p-2 w-[70%] overflow-y-scroll scrollbar-hide max-h-[100px] flex ${chatMessage.role === "user" ? "user-li" : "assistant-li rounded-md"}`}>
                                        <p className="role text-white">
                                            {chatMessage.role.charAt(0).toUpperCase()}
                                            {chatMessage.role.slice(1)} : &nbsp;{chatMessage.content}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="bottom-section w-[100%] h-[] flex flex-col justify-end items-center">
                            <div className="input-container relative flex justify-center items-center w-[70%]">
                                <input
                                    className="w-[100%] bg-black flex justify-between items-center text-white rounded-[5px] py-[12px] px-[120px] outline-none"
                                    value={value}
                                    placeholder="Click the Icon to Upload an Image and Ask about your query."
                                    onChange={(e) => setValue(e.target.value)}
                                />

                                <label htmlFor="file-upload">
                                    <Image
                                        unoptimized
                                        src={imageURL ? imageURL : "/upload_img.svg"}
                                        alt="Google Logo"
                                        className="absolute left-5 top-2 rounded-full"
                                        width={35}
                                        height={35}
                                        priority
                                        objectFit="cover"></Image>
                                </label>

                                <input type="file" id="file-upload" accept="image/*" hidden onChange={handleFileChange} />

                                <IoMdSend
                                    id="submit"
                                    type="submit"
                                    onClick={getMessages}
                                    style={{color: "white", position: "absolute", right: 15, top: 10, height: "25px", width: "25px", cursor: "pointer"}}
                                />
                            </div>
                            <p className="info text-[rgba(255, 255, 255, 0.5)] font-bold text-white p-[10px] text-[11px] w-[100%] max-w-[650px]">
                                At Aquavigil, we are dedicated to ensuring the availability of clean and safe water for all. With a team of passionate experts, we strive to address water-related
                                issues promptly and effectively. Our commitment to excellence and community welfare drives us to continuously improve and innovate. Together, let's make a positive
                                impact on our environment and the lives of people. Join us in our mission for a sustainable future.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
