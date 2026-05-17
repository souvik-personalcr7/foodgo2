import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import genToken from "../utils/token.js"
import { json } from "express"
import { sendOtpMail } from "../utils/mail.js"
export const singUp = async (req, res) => {
    try {
        const { fullName, email, password, mobile, role } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ massage: "user already exist" })
        }
        if (password.length < 6) {
            return res.status(400).json({ massage: "password must be 6 characters" })

        }
        if (mobile.length < 10) {
            return res.status(400).json({ massage: "number length must be 10 digits" })
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
        return res.status(500).json(`sing up error ${error}`)
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
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ massage: "use not exist" })
        }
        // if (password.length < 6) {
        //     return res.status(400).json({ massage: "password must be 6 characters" })

        // }
        // if (mobile.length < 10) {
        //     return res.status(400).json({ massage: "number length must be 10 digits" })
        // }

        // const hashedPassword = await berypt.hash(password, 6)
        // user = await User.create({
        //     fullName,
        //     email,
        //     mobile,
        //     role,
        //     password: hashedPassword
        // })

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            return res.status(400).json({ massage: "password incorrect " })
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
        return res.status(500).json(`sing in error ${error}`)
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
            return res.status(400).json({ massage: "use not exist" })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVeryfied = false
        await user.save()
        await sendOtpMail(email, otp)
        return res.status(200).json({ massage: "otp send success fully" })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json(`send OTP error!! ${error}`)
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
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                fullName, email, mobile, role
            })
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 365 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(`google auth  ERROR !! ${error}`)
    }

}