import { apiConnector } from "../apiConnector"
import { userEndpoints } from "../api"

const { GET_MODIFIED_DESC_API } = userEndpoints

export const getModifiedDescription = async (desc, category, token) => {
  try {
    const result = await apiConnector("POST", GET_MODIFIED_DESC_API, {description: desc, category: category}, {
        authorization: "Bearer " + token,
      })

    console.log("Get modified Description API Response: ", result)
    if (!result?.data?.success) throw new Error("Server Error")

    return {
      result: result.data.description,
      success: true,
    }
  } catch (error) {
    return {
      result: error.message,
      success: false,
    }
  }
}
