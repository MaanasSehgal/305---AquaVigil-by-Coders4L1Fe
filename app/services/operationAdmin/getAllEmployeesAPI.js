import { apiConnector } from "../apiConnector"
import { operationAdminEndpoints } from "../api"

const { GET_ALL_EMPLOYEES_API } = operationAdminEndpoints

export const getAllEmployees = async (token) => {
  try {
    const result = await apiConnector("GET", GET_ALL_EMPLOYEES_API, null, {
      authorization: "Bearer " + token,
    })
    console.log("Employees Response: ", result)

    if (!result?.data?.success) throw new Error("Server Error")

    return {
      result: result.data.data,
      success: true,
    }
  } catch (error) {
    return {
      message: error.message,
      success: false,
    }
  }
}
