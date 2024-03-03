"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { useState } from "react";
import GoogleMaps from "@/app/components/LocationPicker";
import { uploadImage } from "@/app/services/users/imageUpload";
import { createComplaint } from "@/app/services/operationUser/createComplaint";
import { getCategory } from "@/app/services/operationUser/getImageCategoryAPI";
import { getModifiedDescription } from "@/app/services/operationUser/getModifiedDescriptionAPI";
import dynamic from "next/dynamic";

const MessageSnackbar = dynamic(
  () => import("@/app/components/MessageSnackbar"),
  { ssr: false }
);

const ComplaintForm = () => {
  const [locationFieldActive, setLocationFieldActive] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [notSuccessOpen, setNotSuccessOpen] = useState(false);
  const [fetchedLocation, setFetchedLocation] = useState({
    success: false,
    data: "",
    address: { state: "", city: "" },
    latlng: { lat: 0, lng: 0 },
  });
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  console.log("Token: ", token);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

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
    const modifiedFile = new File(
      [file],
      `${Date.now()}${Math.random()}complaintImage.jpg`.replace(".", ""),
      { type: file.type }
    );

    const imageResult = await uploadImage(modifiedFile);
    console.log("Image Result: ", imageResult);
    setImageURL(imageResult.imageUrl);
    console.log("Image Url: ", imageResult.imageUrl);
  };

  const onSubmit = async (data) => {
    if (!imageURL) {
      alert("No image url set");
      return;
    }

    const category = await getCategory(user?.token, imageURL);
    console.log(category);
    const modifiedDescription = await getModifiedDescription(
      data.description,
      category.result,
      user.token
    );

    console.log(data);
    const newData = {
      name: data.name,
      address: fetchedLocation.data,
      state: fetchedLocation.address.state,
      phone: data.phNumber,
      description: modifiedDescription.result || data.description,
      location: fetchedLocation.latlng,
      imageUrl: imageURL,
      userId: user._id,
      category: category.result || "Others",
    };

    console.log(newData);
    const result = await createComplaint(token, newData);
    if (!result) {
      setNotSuccessOpen(true)
      return console.log("Complaint not created");
    }
    console.log("New Complaint res: ", result);
    setSuccessOpen(true)
  };
  return (
    <>
      <div className="flex items-center justify-center gap-3 overflow-y-hidden">
        <div className="">
          <Sidebar />
        </div>
        <div className="complaint_form w-[38vw] h-screen flex items-start mt-2 justify-center">
          <div className="ml-9">
            <div className="">
              <h1 className="text=[#292D42] font-bold text-3xl text-[#272324] mb-1">
                Complaint Form
              </h1>
            </div>
            <div>
              <button className="flex items-center justify-center mt-4 bg-[#F4F7FE] w-[27vw] h-[5vh] p-6 rounded-lg">
                <span>
                  <Image
                    src="/whatsapp.svg"
                    alt="Google Logo"
                    className="w-6"
                    width={5}
                    height={10}
                    priority
                  />
                </span>
                <span className="ml-2 text-[#292D42]">
                  Complaint on Whatsapp
                </span>
              </button>
            </div>
            <div>
              <p className=" text-[#E5EAF4] flex items-center justify-center">
                <span className="mr-2">______________________ </span>
                <span className="text-[#B2C4DE]">or</span>
                <span className="ml-2">_______________________</span>
              </p>
            </div>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="w-[28vw] h-[43vh]"
              noValidate
              autoComplete="off"
            >
              <label htmlFor="name" className="text-[#3A4264] mt-1">
                Name*
              </label>
              <input
                type="text"
                id="name"
                onClick={() => setLocationFieldActive(false)}
                value={user?.name}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                className="w-[27vw] h-[4vh] border-[#3B2C4DE] border-2 p-4"
              />
              <p className="text-red-600 mb-3">{errors.name?.message}</p>
              <label htmlFor="address" className="text-[#3A4264]">
                Address*
              </label>
              <input
                type="text"
                id="address"
                onClick={() => setLocationFieldActive(true)}
                value={fetchedLocation.success ? fetchedLocation.data : ""}
                {...register("address")}
                className="w-[27vw] h-[4vh] border-[#3B2C4DE] border-2 p-4 "
              />
              <p className="text-red-500 mb-3">
                {fetchedLocation.success ? "" : fetchedLocation.data}
              </p>
              <label htmlFor="state" className="text-[#3A4264]">
                State*
              </label>
              <input
                type="text"
                id="state"
                onClick={() => setLocationFieldActive(false)}
                value={
                  fetchedLocation.success ? fetchedLocation.address.state : ""
                }
                {...register("state")}
                className="w-[27vw] h-[4vh] border-[#3B2C4DE] border-2 p-4 "
              />
              <p className="text-red-500 mb-3">
                {fetchedLocation.success ? "" : fetchedLocation.data}
              </p>
              <div className="relative">
                <label htmlFor="phNumber" className="text-[#3A4264]">
                  {" "}
                  <span>
                    {" "}
                    <Image
                      src="/indFlag.svg"
                      alt="Vercel Logo"
                      className=" w-[1.5vw] absolute bottom-[25%] left-[3%]"
                      width={200}
                      height={46}
                      priority
                    />
                  </span>
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phNumber"
                  onClick={() => setLocationFieldActive(false)}
                  {...register("phNumber", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                  name="phNumber"
                  className="w-[27vw] px-12 h-[4vh] mb-2  border-[#3B2C4DE] border-2 p-4 focus:border-[#234DF0]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="text-[#3A4264]">
                  Description*
                </label>
                <textarea
                  id="description"
                  cols={25}
                  rows={4}
                  onClick={() => setLocationFieldActive(false)}
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                  className="border-[#3B2C4DE] border-2 p-4 focus:border-[#234DF0]"
                />
              </div>
              <button
                className="w-[27vw] h-[6vh] bg-[#234DF0] p-5 mt-2 text-white flex items-center justify-center rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className=" w-[46vw] h-screen">
          <div className="flex flex-col items-center justify-center h-[100%]">
            <p className="text-[#3A4264] mb-3 text-xl">
              {imageURL
                ? "Image Uploaded Successfully"
                : imageError
                ? "File type not supported"
                : "Upload Image"}
            </p>

            {locationFieldActive ? (
              <GoogleMaps setFetchedLocation={setFetchedLocation} />
            ) : (
              <>
                <label htmlFor="file-upload">
                  <Image
                    unoptimized
                    src={imageURL ? imageURL : "/upload_img.svg"}
                    alt="Google Logo"
                    className="w-[33vw] h-[52vh]"
                    width={5}
                    height={10}
                    priority
                    objectFit="cover"
                  ></Image>
                </label>

                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <MessageSnackbar
        open={successOpen}
        message="complaint Created Successfully!"
        autoHideDuration={5000}
        severity={"success"}
      />

<MessageSnackbar
        open={notSuccessOpen}
        message="Complaint Creation Failure!"
        autoHideDuration={5000}
        severity={"success"}
      />
    </>
  );
};

export default ComplaintForm;
