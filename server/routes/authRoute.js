const express = require("express")
const router = express.Router()

// const { register, login } = require("../controllers/auth")
const { register, login } = require("../controllers/Auth/auth")

router.post("/register", register)
router.post("/login", login)

module.exports = router
