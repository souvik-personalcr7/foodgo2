import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import genToken from "../utils/token.js"
import { json } from "express"
import { sendOtpMail } from "../utils/mail.js"
export const singUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        
        if (!fullName || !email || !password || !mobile || !role) {
            return res.status(400).json({ message: "All fields are required" })
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        if (mobile.length < 10) {
            return res.status(400).json({ message: "Mobile number must be at least 10 digits" })
        }

        const hashedPassword = await bcrypt.hash(password, 6)
        user = await User.create({
            fullName,
            email,
            mobile,
            role,
            password: hashedPassword
        })
        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.status(201).json({ user, token })
    }

    catch (error) {
        return res.status(500).json({ message: `Sign up error: ${error.message}` })
    }
}

//................................................................................................................................
//................................................................................................................................
//................................................................................................................................
//................................................................................................................................
//........................................................................  ........................................................

export const singIn = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(400).json({ message: "Password is incorrect" })
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        delete user.password;
        return res.status(200).json(user)
    }

    catch (error) {
        return res.status(500).json({ message: `Sign in error: ${error.message}` })
    }
}

// export const singOut = async (req, res) => {
//     try {
//         res.clearCookie("token")
//         return res.status(200), json({ massage: "logout" })
//     } catch (error) {
//         return res.status(500).json(`singOut error!! ${error}`)
//     }
// }

export const singOut = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
};



export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "No account found with this email" })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVeryfied = false
        await user.save()

        try {
            await sendOtpMail(email, otp)
        } catch (mailError) {
            console.error("Mail error:", mailError)
            return res.status(500).json({ message: "Failed to send OTP email. Please check server email configuration (Gmail App Password required)." })
        }

        return res.status(200).json({ message: "OTP sent successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `Send OTP error: ${error.message}` })
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ massage: "invalid/expired OTP" })
        }

        user.isOtpVeryfied = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({ massage: "OTP verify success fully" })
    } catch (error) {
        return res.status(500).json(`verify error!! ${error}`)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVeryfied) {
            return res.status(400).json({ massage: "user do not exist " })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 6)
        user.password = hashedPassword
        user.isOtpVeryfied = false
        await user.save()
        return res.status(200).json({ massage: "password reset success fully" })
    } catch (error) {
        return res.status(500).json(`reset password ERROR !! ${error}`)
    }
}

export const googleAuth = async (req, res) => {
    try {
        const { fullName, email, mobile, role } = req.body

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        let user = await User.findOne({ email })

        if (!user) {
            // New user — create with whatever data we have from Google
            user = await User.create({
                fullName: fullName || email.split("@")[0], // fallback to email prefix
                email,
                mobile: mobile || "",
                role: role || "user", // default role is user
                password: undefined,
            })
        } else {
            // Existing user — optionally update fields if provided
            if (fullName && !user.fullName) user.fullName = fullName
            if (mobile && !user.mobile) user.mobile = mobile
            await user.save()
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        // Always return { user } for consistent frontend consumption
        return res.status(200).json({ user })
    } catch (error) {
        console.error("Google auth error:", error)
        return res.status(500).json({ message: `Google auth error: ${error.message}` })
    }
}