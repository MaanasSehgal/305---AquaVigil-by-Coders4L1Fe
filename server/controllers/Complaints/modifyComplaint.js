const database = "Complaints"
const { getClient } = require("../../config/database")
const { ObjectId } = require("mongodb")


exports.modifyComplaint = async (req, res) => {
  try {
    const { complaintId, status, employeeIdArray } = req.body
    if (!complaintId || !status || !employeeIdArray) {
      return res.status(400).json({
        success: false,
        message: "Complaint Id and status and employeeIdArray is required",
      })
    }

    console.log(complaintId, status, employeeIdArray)


    const client = getClient()
    const complaints = client.db().collection(database)
    const result = await complaints.updateOne(
      { _id: new ObjectId(complaintId) },
      { $set: { status: status, employeeId: [...employeeIdArray] } },
      { new : true }
    )

    console.log(result)

    

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
    })
  } catch (error) {
    console.log("Error in modify complaint: ",)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
