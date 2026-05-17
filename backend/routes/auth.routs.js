import express from "express"
import { googleAuth, resetPassword, sendOtp, singIn, singOut, singUp, verifyOtp } from "../controllers/auth.controllers.js"

const authrouter = express.Router()
authrouter.post ("/singup",singUp)
authrouter.post ("/singin",singIn)
authrouter.get ("/singout",singOut)

authrouter.post ("/send-otp",sendOtp)
authrouter.post ("/verify-otp",verifyOtp)
authrouter.post ("/reset-password",resetPassword)
authrouter.post ("/google-auth",googleAuth)




export default authrouter 