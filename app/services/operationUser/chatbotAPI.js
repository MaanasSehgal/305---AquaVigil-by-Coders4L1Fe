import {apiConnector} from "../apiConnector";
import {operationUserEndpoints} from "../api";

const { CHATBOT_API } = operationUserEndpoints

export const getResponse = async (token, url, desc) => {
    try {
        const result = await apiConnector(
            "POST",
            CHATBOT_API,
            {imageUrl: url, description: desc},
            {
                authorization: "Bearer " + token,
            }
        );

        console.log("Chatbot Response: ", result);
        if (!result?.data?.success) throw new Error("Server Error");

        return {
            result: result.data.data,
            success: true,
        };
    } catch (error) {
        return {
            result: error.message,
            success: false,
        };
    }
};
