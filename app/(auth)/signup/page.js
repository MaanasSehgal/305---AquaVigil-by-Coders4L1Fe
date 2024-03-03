"use client";
import Image from "next/image";
import {useForm} from "react-hook-form";
// import {DevTool} from '@hookform/devtools'
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useState} from "react";
import GoogleMaps from "../../components/LocationPicker";
import {registerUser} from "../../services/auth/auth";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [locationFieldActive, setLocationFieldActive] = useState(false);
    const [fetchedLocation, setFetchedLocation] = useState({
        success: false,
        data: "",
        latlng: {lat: 0, lng: 0},
    });
    const schema = yup.object({
        name: yup.string().required("Name is required"),
        age: yup.number().required("Age is required").positive("Age must be a positive number").integer("Age must be an integer"),
        phNumber: yup
            .string()
            .required("Phone number is required")
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
        email: yup.string().email("Email format is not valid !").required(""),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must contain at least 8 characters")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Password must contain at least 1 lowercase, 1 uppercase, and 1 special character"),
    });
    const {register, control, handleSubmit, formState} = useForm({
        resolver: yupResolver(schema),
    });
    const {errors} = formState;

    console.log("Field Active:", locationFieldActive);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const newData = {
                name: data.name,
                phone: data.phNumber,
                email: data.email,
                password: data.password,
                location: fetchedLocation,
            };
            console.log(newData);
            let result = await registerUser(newData);

            console.log("Result of Registration: ", result);

            if (result.success) {
                router.replace("/signin");
            }

            if (!result) throw new Error("Registration failed");
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            });
        }
    };
    return (
        <>
            <div className=" w-full flex items-center justify-center gap-7 mt-1 overflow-y-hidden ">
                <div className="w-1/2 h-screen">
                    <div className="flex items-center justify-center relative">
                        <div className="absolute top-[2%] left-[20%] flex items-center gap-2">
                            <Image src="/logo.svg" alt="Vercel Logo" className="w-[2vw]" width={200} height={46} priority />
                            <h2 className="text-black font-medium text-xl">AquaVigil</h2>
                        </div>
                        <div className="mt-16">
                            <div className="flex flex-col items-start gap-7 mb-3">
                                <div className="">
                                    <h1 className="text=[#292D42] font-bold text-3xl mb-1">Sign Up</h1>
                                    <p className="text-[#8DA6CD]">Enter your details to sign up!</p>
                                </div>
                            </div>
                            <form action="" onSubmit={handleSubmit(onSubmit)} className="w-[28vw] h-[40.5vh]" noValidate>
                                <label htmlFor="name" className="text-[#182467]">
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    onClick={() => setLocationFieldActive(false)}
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required",
                                        },
                                    })}
                                    className="w-[27vw] h-[1vh] border-[#3B2C4DE] border-2 p-4 focus:border-[#234DF0]"
                                />
                                <p className="text-red-500 mb-3">{errors.name?.message}</p>
                                <div className="flex justify-center items-center gap-4">
                                    <div className="">
                                        <label htmlFor="age" className="text-[#182467]">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            id="age"
                                            onClick={() => setLocationFieldActive(false)}
                                            {...register("age", {
                                                required: {
                                                    valueAsNumber: true,
                                                    value: true,
                                                    message: "Age is required",
                                                },
                                            })}
                                            className="w-[10vw] h-[1vh] border-[#3B2C4DE] border-2 p-4 mb-2 focus:border-[#234DF0]"></input>
                                        <p className="text-red-500 mb-3">{errors.age?.message}</p>
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="phNumber" className="text-[#182467]">
                                            {" "}
                                            <span>
                                                {" "}
                                                <Image src="/indFlag.svg" alt="Vercel Logo" className=" w-[1.5vw] absolute top-[39%] left-[6%] z-10" width={200} height={46} priority />
                                            </span>{" "}
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            id="phNumber"
                                            onClick={() => setLocationFieldActive(false)}
                                            {...register("phNumber", {
                                                required: {
                                                    valueAsNumber: true,
                                                    value: true,
                                                    message: "Phone No. is required",
                                                },
                                            })}
                                            className="w-[16vw] h-[1vh]  border-[#3B2C4DE] border-2 p-4 mb-2  focus:border-[#234DF0] relative"></input>
                                        <p className="text-red-500 mb-3">{errors.phNumber?.message}</p>
                                    </div>
                                </div>
                                <label htmlFor="location" className="text-[#182467] ">
                                    Location*
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={fetchedLocation.success ? fetchedLocation.data : ""}
                                    placeholder="Type your location"
                                    onClick={() => setLocationFieldActive(true)}
                                    className="w-[27vw] h-[1vh] border-[#3B2C4DE] border-2 p-4 mb-2"></input>
                                <p className="text-red-500 mb-3">{fetchedLocation.success ? "" : fetchedLocation.data}</p>
                                <label htmlFor="email" className="text-[#182467]">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    onClick={() => setLocationFieldActive(false)}
                                    {...register("email", {
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    className="w-[27vw] h-[1vh] border-[#3B2C4DE] border-2 p-4"
                                />
                                <p className="text-red-600 mb-3">{errors.email?.message}</p>
                                <label htmlFor="password" className="text-[#182467]">
                                    Password*
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onClick={() => setLocationFieldActive(false)}
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "password is required",
                                        },
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: "Password not in correct form",
                                        },
                                    })}
                                    className="w-[27vw] h-[1vh] border-[#3B2C4DE] border-2 p-4"
                                />
                                <p className="text-red-500 mb-3">{errors.password?.message}</p>
                                <div className="flex items-center justify-start gap-2">
                                    <input type="checkbox" name="check" id="check" />
                                    <label htmlFor="check" className="text-[#3A4264]">
                                        Agree to{" "}
                                        <a href="/terms" className="text-[#234DF0]">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>

                                <button className="w-[27vw] h-[6vh] bg-[#234DF0] p-5 text-white flex items-center justify-center rounded-lg mt-3" type="submit">
                                    Sign Up
                                </button>
                                <p className="text-[#182467] mt-5">
                                    Have an Account?{" "}
                                    <a href="/signin">
                                        <span className="text-[#234DF0] font-semibold cursor-pointer hover:underline">Sign In</span>
                                    </a>
                                </p>
                            </form>
                            {/* <DevTool control={control} /> */}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-screen bg-[#F5F7FD]">
                    {locationFieldActive ? (
                        <GoogleMaps setFetchedLocation={setFetchedLocation} />
                    ) : (
                        <div className="bg-[#F5F7FD] flex items-center justify-center">
                            <Image src="/earth2.png" alt="Vercel Logo" width={700} height={46} priority />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
