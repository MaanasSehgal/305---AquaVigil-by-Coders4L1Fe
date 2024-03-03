import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../api";

const { PREDICT_CATEGORY_API } = userEndpoints;

export const getCategory = async (token, data) => {
  try {
    const result = await apiConnector(
      "POST",
      PREDICT_CATEGORY_API,
      { imageUrl: data },
      {
        authorization: "Bearer " + token,
      }
    );

    console.log("Image Category Response: ", result);
    if (!result?.data?.success) throw new Error("Server Error");

    return {
      result: result.data.problem,
      success: true,
    };
  } catch (error) {
    return {
      result: error.message,
      success: false,
    };
  }
};
