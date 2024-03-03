const { getClient } = require("../../config/database")
const database = "Complaints"
const userDatabase = "User"


exports.getUniqueCategories = async (req, res) => {
  try {
    const client = getClient()
    const complaints = client.db().collection(database)
    const result = await complaints.aggregate([
      {
        $lookup: {
          from: userDatabase,
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      }
    ]).toArray();

    let uniqueCategories = []
    result.forEach((complaint) => uniqueCategories.push(complaint.category))
    uniqueCategories = uniqueCategories.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

    res.status(200).json({
      success: true,
      data: uniqueCategories,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
