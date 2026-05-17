import express from "express"
import isAuth from "../middleweres/isAuth.js"
import { addItem, editItem } from "../controllers/item.contrellers.js"
import upload from "../middleweres/multer.js"
//import { getCurrentUser } from "../controllers/user.controllers.js"
//import isAuth from "../middleweres/isAuth.js"
//import { googleAuth, resetPassword, sendOtp, singIn, singOut, singUp, verifyOtp } from "../controllers/auth.controllers.js"

const itemRouter = express.Router()
// authrouter.post ("/singup",singUp)
// authrouter.post ("/singin",singIn)
//authrouter.post ("/singout",singOut)
itemRouter.post ("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)

// authrouter.post ("/send-otp",sendOtp)
// authrouter.post ("/verify-otp",verifyOtp)
// authrouter.post ("/reset-password",resetPassword)
// authrouter.post ("/google-auth",googleAuth)



export default itemRouter