const BASE_USER_URL = "http://localhost:4000/api/v1/user";
const BASE_ADMIN_URL = "http://localhost:4000/api/v1/admin";
const AUTH_URL = "http://localhost:4000/api/v1/auth";
const IMAGE_PREDICT_URL = "http://127.0.0.1:5000/predict";

export const authEndpoints = {
    LOGIN_API: AUTH_URL + "/login",
    REGISTER_API: AUTH_URL + "/register",
};

export const operationUserEndpoints = {
    GET_ALL_COMPLAINTS_API: BASE_USER_URL + "/getAllComplaints",
    GET_COMPLAINTS_BY_ID_API: BASE_USER_URL + "/getAllComplaintsById",
    CREATE_COMPLAINT_API: BASE_USER_URL + "/createComplaint",
    CHATBOT_API: BASE_USER_URL + "/chat",
};

export const operationAdminEndpoints = {
    GET_ALL_EMPLOYEES_API: BASE_ADMIN_URL + "/getAllEmployees",
    GET_ALL_COMPLAINTS_API: BASE_ADMIN_URL + "/getAllComplaints",
    GET_UNIQUE_CATEGORIES_API: BASE_ADMIN_URL + "/getUniqueCategories",
    MODIFY_COMPLAINT_API: BASE_ADMIN_URL + "/modifyComplaint",
    REGISTER_EMPLOYEE_API: BASE_ADMIN_URL + "/registerEmployee",
    MODIFY_COMPLAINT_API: BASE_ADMIN_URL + "/modifyComplaint",
};
export const userEndpoints = {
    IMAGE_UPLOAD_API: BASE_USER_URL + "/imageUpload",
    PREDICT_CATEGORY_API: BASE_USER_URL + "/getImageCategory",
    GET_MODIFIED_DESC_API: BASE_USER_URL + "/getModifiedDescription",
};
