const jwt = require("jsonwebtoken");
const { getClient } = require("../../config/database");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
const UserDb = "User";
const EmployeeDb = "Employee";
const { promisify } = require("util");
require("dotenv").config();
const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

exports.employeeRegister = async (req, res) => {
  try {
    const { name, age, email, location, phone, bossId, password } = req.body;
    req.body.type = "employee";
    if (!name || !email || !location || !phone || !bossId || !age || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
      });
    }

    const client = getClient();
    const Employee = client.db().collection(EmployeeDb);
    const exist_employee = await Employee.findOne({ email: email });

    req.body.password = await bcrypt.hash(req.body.password, 12)

    if (exist_employee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const new_employee = await Employee.insertOne(req.body);

    if (new_employee) {
      return res.status(200).json({
        success: true,
        message: "Employee registered successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
