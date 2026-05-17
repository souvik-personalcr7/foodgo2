// import { v2 as cloudinary } from 'cloudinary'
// import fs from "fs"

// const uploadCloudnirary = async (File) => {
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     });

//     try {
//         const result = await cloudinary.uploader.upload(File)
//         fs.unlinkSync(File)
//         return result.secure_url


//     } catch (error) {
//         fs.unlinkSync(File)
//         console.log(error)
//     }
// }

// export default uploadCloudnirary

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "FoodGo",
    });
    fs.unlinkSync(filePath); // delete local file
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw error;
  }
};

export default uploadCloudinary;
