const { getClient } = require("../../config/database")
const EmployeeDb = "Employee"

exports.getAllEmployees = async (req, res) => {
  try {
    const client = getClient()
    const Employee = client.db().collection(EmployeeDb)
    const bossId = req.userId
    const bossIdToString = bossId.toString()
    const result = await Employee.find({ bossId: bossIdToString }).toArray()
    // const result = await Employee.find({ bossId: bossId }).toArray()

    if (!result) {
      res.status(400).json({
        success: false,
        data: "No Employees Found.",
      })
    }

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
