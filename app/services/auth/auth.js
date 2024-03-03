"use client";
import { toast } from "react-hot-toast"

import { authEndpoints } from "../api"
import { apiConnector } from "../apiConnector"

const { LOGIN_API, REGISTER_API } = authEndpoints

export const loginUser = async (data) => {
  const toastId = toast.loading("Logging in...")

  try {
    const response = await apiConnector("POST", LOGIN_API, data)
    console.log("Login Response: ", response)

    if (!response?.data?.success) throw new Error("Login failed")

    toast.success("Login successful")
    toast.dismiss(toastId)
    return {
      result: response.data.message,
      success: true,
      user: response.data.user,
      token: response.data.token,
      type: response.data.type,
    }
  } catch (error) {
    toast.dismiss(toastId)
    toast.error("Login api error")
    return {
      result: error.message,
      success: false,
    }
  }
}

export const registerUser = async (data) => {
  const toastId = toast.loading("Registering...")
  try {
    const response = await apiConnector("POST", REGISTER_API, data)
    console.log("Register response: ", response)

    if (!response?.data?.success) {
      toast.error(response.data.message)
      throw new Error("Registration failed")
    }

    toast.success("Registration successful")
    toast.dismiss(toastId)
    return {
      success: response?.data?.success,
      result: response?.data?.message,
    }
  } catch (error) {
    toast.dismiss(toastId)
    toast.error("Registration api error")
    return {
      result: error.message,
      success: false,
    }
  }
}
