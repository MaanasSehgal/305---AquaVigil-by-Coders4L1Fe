require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const request = require("request");

var download = async function (uri, filename, callback) {
  request.head(uri, async function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    await request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

exports.getImageCategory = async (req, res) => {
  try {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    if (!req.body.imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image Url is required",
      });
    }

    const filename = `${Date.now()}.jpeg`;

    // Wait for the image to be downloaded before proceeding
    await new Promise((resolve, reject) => {
      download(req.body.imageUrl, filename, function () {
        console.log("Image downloaded");
        resolve();
      });
    });

    const prompt =
      'What local water problem does the image signify? Give the answer in on word that is only the problem."}.';

    const imageParts = fileToGenerativePart(filename, "image/jpeg");

    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    const text = response.text();

    //   let jsonString = text.replace("json", "").replace("", "");
    let jsonString = text;
    console.log("JSON String:", jsonString);

    //   const jsonObject = JSON.parse(jsonString);
    console.log(jsonString);

    if (!jsonString) {
      return res.status(400).json({
        success: false,
        message: "Error while Parsing.",
      });
    }

    await new Promise((resolve, reject) => {
      fs.unlink(filename, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
        resolve();
      });
    });

    return res.status(200).json({
      success: true,
      problem: jsonString,
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
