import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        // ⚠️  Must be a Gmail App Password (16 chars), NOT your regular Gmail password.
        // Get one at: myaccount.google.com/apppasswords
        pass: process.env.PASS,
    },
});

export const sendOtpMail = async (to, otp) => {
    // This will THROW if credentials are wrong — so the controller can return a proper error
    await transporter.sendMail({
        from: `"FoodGo 🍔" <${process.env.EMAIL}>`,
        to,
        subject: "Your FoodGo Password Reset OTP",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fff9f6; border-radius: 16px; border: 2px solid #fde68a;">
                <h2 style="color: #b45309; margin: 0 0 8px;">🍔 FoodGo — Password Reset</h2>
                <p style="color: #78716c; font-size: 15px;">Use the OTP below to reset your password. It expires in <strong>5 minutes</strong>.</p>
                <div style="text-align: center; margin: 24px 0;">
                    <span style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #b45309; background: #fef3c7; padding: 16px 28px; border-radius: 12px; display: inline-block;">${otp}</span>
                </div>
                <p style="color: #a8a29e; font-size: 12px;">If you didn't request this, ignore this email. Your account is safe.</p>
            </div>
        `
    });
    console.log("✅ OTP email sent to:", to);
}
