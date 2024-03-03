const UserDb = "User"
const { getClient } = require("../../config/database")

exports.getProfile = async (req, res) => {
  try {
    const client = getClient()
    const user = client.db().collection(UserDb)
    const result = await user.findOne({ _id: req.userId })

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
