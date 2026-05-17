import express from "express"
import { getCurrentUser } from "../controllers/user.controllers.js"
import isAuth from "../middleweres/isAuth.js"
//import { googleAuth, resetPassword, sendOtp, singIn, singOut, singUp, verifyOtp } from "../controllers/auth.controllers.js"

const userRouter = express.Router()
// authrouter.post ("/singup",singUp)
// authrouter.post ("/singin",singIn)
//authrouter.post ("/singout",singOut)
userRouter.get ("/current",isAuth,getCurrentUser)

// authrouter.post ("/send-otp",sendOtp)
// authrouter.post ("/verify-otp",verifyOtp)
// authrouter.post ("/reset-password",resetPassword)
// authrouter.post ("/google-auth",googleAuth)



export default userRouter