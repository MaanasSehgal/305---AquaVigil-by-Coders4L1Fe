const { ObjectId } = require("mongodb")
const { getClient } = require("../../config/database")
const database = "Complaints"

exports.createComplaint = async (req, res) => {
  try {
    const { description, address, imageUrl, category, location, phone } = req.body

    let status =
      description && address && imageUrl && category && location && phone ? true : false

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    const client = getClient()
    const complaints = client.db().collection(database)

    const result = await complaints.insertOne({
      userId: req.userId,
      description: description,
      address: address,
      imageUrl: imageUrl,
      category: category,
      status: "pending",
      employeeId: [],
      location: location,
      phone: phone,
      date: new Date().toLocaleDateString(),
    })

    if (result) {
      res.status(200).json({
        success: true,
        message: "Complaint created successfully",
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
