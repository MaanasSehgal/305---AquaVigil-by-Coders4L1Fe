import { apiConnector } from "../apiConnector"
import { operationAdminEndpoints } from "../api"

const { MODIFY_COMPLAINT_API } = operationAdminEndpoints

export const modifyComplaint = async (token, data) => {
  try {
    const result = await apiConnector("POST", MODIFY_COMPLAINT_API, data, {
      authorization: "Bearer " + token,
    })

    console.log("Create Complaint Response: ", result)
    if (!result?.data?.success) throw new Error("Server Error")

    return {
      result: result.data.data,
      success: true,
    }
  } catch (error) {
    return {
      result: error.message,
      success: false,
    }
  }
}
