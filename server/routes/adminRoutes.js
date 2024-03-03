const express = require("express")
const router = express.Router()

const { protect } = require("../controllers/Auth/auth")
const { getAllEmployees } = require("../controllers/Admin/getAllEmployees")
const { getAllComplaints } = require("../controllers/Complaints/getAllComplaint")
const { getUniqueCategories } = require("../controllers/Complaints/getUniqueCategories")
const { modifyComplaint } = require("../controllers/Complaints/modifyComplaint")
const { employeeRegister } = require("../controllers/Admin/employeeRegister")

router.get("/getAllEmployees", protect, getAllEmployees)
router.get("/getAllComplaints", protect, getAllComplaints)
router.get("/getUniqueCategories", protect, getUniqueCategories)
router.post("/modifyComplaint", protect, modifyComplaint)
router.post("/registerEmployee", protect, employeeRegister)

module.exports = router
