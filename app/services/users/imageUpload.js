"use client";
import { toast } from "react-hot-toast"

import { userEndpoints } from "../api"
import { apiConnector } from "../apiConnector"

const { IMAGE_UPLOAD_API } = userEndpoints

export const uploadImage = async (imageFile) => {
    console.log("Image file: ", imageFile)
    const toastId = toast.loading('Uploading image...'); // Assuming you have a toast library
  
    try {
      const formData = new FormData(); // Use FormData for multipart/form-data requests
      formData.append('imageFile', imageFile); // Add the image file to the formData
  
      const response = await apiConnector("POST",IMAGE_UPLOAD_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Set appropriate headers
      });
  
      if (!response.data.success) {
        throw new Error('Image upload failed');
      }
  
      toast.success('Image uploaded successfully');
      toast.dismiss(toastId);
  
      return {
        result: response.data.message,
        success: true,
        imageUrl: response.data.imageUrl, // Assuming your API returns image data
      };
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Image upload failed'); // Provide more specific error message if possible
      return {
        result: error.message,
        success: false,
      };
    }
  };