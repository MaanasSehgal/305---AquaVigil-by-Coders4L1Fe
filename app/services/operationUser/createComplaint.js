import { apiConnector } from "../apiConnector"
import { operationUserEndpoints } from "../api"

const { CREATE_COMPLAINT_API } = operationUserEndpoints

export const createComplaint = async (token, data) => {
  try {
    const result = await apiConnector("POST", CREATE_COMPLAINT_API, data, {
      authorization: "Bearer " + token,
    })

    console.log("Create Complaint Response: ", result)
    if (!result?.data?.success) throw new Error("Server Error")

    return {
      result: result.data.message,
      success: true,
    }
  } catch (error) {
    return {
      result: error.message,
      success: false,
    }
  }
}
