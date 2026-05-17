import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

// export const sendOtpMail = async (to, otp) => {
//     await transporter.sendMail({00
//         from: process.env.EMAIL,
//         to,
//         subject: "Reset your password ",
//         html: `your otp for password RESET <b>${otp}</b>.It expires in 5 mins `
//     })
// }

export const sendOtpMail = async (to, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: "Reset your password",
            html: `Your OTP for password reset is <b>${otp}</b>. It expires in 5 mins.`
        });
        console.log("OTP email sent",to);
    } catch (err) {
        console.error("Failed to send OTP:", err);
    }
}
