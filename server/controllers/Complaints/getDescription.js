const { OpenAI } = require("openai")

require("dotenv").config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
})

exports.getDescription = async (req, res) => {
  try {
    const { description, category } = req.body
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      })
    }

    const prompt =
      "Given description: " +
      description +
      "Given issue: " +
      category +
      " Please provide a short summary of the description like what to do in this situation."

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
      max_tokens: 1000,
    })

    console.log("response:", response.choices[0].message.content)

    return res.status(200).json({
      success: true,
      description: response.choices[0].message.content,
    })
  } catch (error) {
    console.log("error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
