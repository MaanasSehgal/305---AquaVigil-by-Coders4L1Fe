import { apiConnector } from "../apiConnector"
import { operationAdminEndpoints } from "../api"
import { toast } from "react-hot-toast"
const { GET_UNIQUE_CATEGORIES_API } = operationAdminEndpoints

export const getUniqueCategories = async (token) => {
  const toastId = toast.loading("Get all complaints...");
  try {
    const result = await apiConnector("GET", GET_UNIQUE_CATEGORIES_API, null, {
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
