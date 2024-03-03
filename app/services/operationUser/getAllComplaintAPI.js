import { apiConnector } from "../apiConnector";
import { operationUserEndpoints } from "../api";
import { toast } from "react-hot-toast";

const { GET_ALL_COMPLAINTS_API, GET_COMPLAINTS_BY_ID_API } =
  operationUserEndpoints;

export const getAllcomplaints = async (token) => {
  const toastId = toast.loading("Get all complaints...");
  try {
    const result = await apiConnector("GET", GET_ALL_COMPLAINTS_API, null, {
      authorization: "Bearer " + token,
    });
    console.log("Complaints Response: ", result);

    if (!result?.data?.success) throw new Error("Server Error");
    toast.success("Got all complaints");
    toast.dismiss(toastId);

    return {
      result: result.data.data || [],
      success: true ? result.data.success : false,
    };
  } catch (error) {
    toast.dismiss(toastId);
    toast.error("Get all complaints api error");
    return {
      result: error.message,
      success: false,
    };
  }
};

export const getAllComplaintsById = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      GET_COMPLAINTS_BY_ID_API,
      null,
      {
        authorization: "Bearer " + token,
      }
    )

    console.log("Get all complaints by id response: ", response)

    return {
      result: response?.data?.data || [],
      success: true ? response.data.success : false,
    }
  } catch (error) {
    return {
      result: error.message,
      success: false,
    }
  }
}
