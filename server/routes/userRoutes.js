const express = require("express");
const router = express.Router();

const {createComplaint} = require("../controllers/Complaints/createComplaint");
const {getAllComplaintsById, getAllComplaintsByLocation, getAllComplaints} = require("../controllers/Complaints/getAllComplaint");
const {protect} = require("../controllers/Auth/auth");
const {imageUpload} = require("../controllers/fileUpload");
const {getDescription} = require("../controllers/Complaints/getDescription");
const {getImageCategory} = require("../controllers/Complaints/getImageCategory");
const {chatbot} = require("../controllers/chatbotController");

router.post("/createComplaint", protect, createComplaint);
router.get("/getAllComplaintsById", protect, getAllComplaintsById);
router.get("/getAllComplaintsByLocation", protect, getAllComplaintsByLocation);
router.get("/getAllComplaints", protect, getAllComplaints);
router.post("/imageUpload", imageUpload);
router.post("/getModifiedDescription", protect, getDescription);
router.post("/getImageCategory", protect, getImageCategory);
router.post("/chat", protect, chatbot);

module.exports = router;
