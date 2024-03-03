const cloudinary = require("cloudinary").v2


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type)
}


async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder}
    options.resource_type = "auto"
    if (quality) {
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

// image upload handler
exports.imageUpload = async (req, res) => {
    try {

        const file = req.files.imageFile
        console.log(file)


        // validation
        const supportedTypes = ['jpg', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase()        

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported!"
            })
        }

        // File format supported hai
        const response = await uploadFileToCloudinary(file, "AquaVigil")
        console.log(response)

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully."
        })


    } catch (error) {
        console.error(error)
        res.status(400).json({
            success:false,
            message:"Something went wrong."
        })
    }
}