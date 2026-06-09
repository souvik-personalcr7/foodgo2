import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';

const primaryColour = '#ff4d2d';
const bgColour = '#fff9f6';

function ForgotPassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()

    const handelsendOtp = async () => {
        if (!email) return setError("Please enter your email address")
        setError("")
        setLoading(true)
        try {
            await axios.post(`${serverUrl}/api/auth/send-otp`, { email },
                { withCredentials: true })
            setSuccess("OTP sent! Check your Gmail inbox (also check spam folder).")
            setStep(2)
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.massage || "Failed to send OTP. Make sure this email is registered."
            setError(msg)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handelverifyOtp = async () => {
        if (!otp) return setError("Please enter the OTP")
        setError("")
        setSuccess("")
        setLoading(true)
        try {
            await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp },
                { withCredentials: true })
            setSuccess("OTP verified! Now set your new password.")
            setStep(3)
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.massage || "Invalid or expired OTP. Please try again."
            setError(msg)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handelResetPassword = async () => {
        if (!newPassword || !confirmPassword) return setError("Please fill in both password fields")
        if (newPassword !== confirmPassword) return setError("Passwords do not match")
        if (newPassword.length < 6) return setError("Password must be at least 6 characters")
        setError("")
        setLoading(true)
        try {
            await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword },
                { withCredentials: true })
            setSuccess("Password reset successfully! Redirecting to sign in...")
            setTimeout(() => navigate("/singin"), 1500)
        } catch (error) {
            const msg = error.response?.data?.message || error.response?.data?.massage || "Failed to reset password."
            setError(msg)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const stepLabels = ["Enter Email", "Verify OTP", "New Password"]

    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>

                {/* Header */}
                <div className='flex items-center gap-4 mb-6'>
                    <IoIosArrowRoundBack size={40} className='text-[#ff4d2d] cursor-pointer'
                        onClick={() => navigate("/singin")} />
                    <h1 className='text-2xl font-bold text-[#ff4d2d]'>Forgot Password</h1>
                </div>

                {/* Step indicator */}
                <div className='flex items-center justify-between mb-8'>
                    {stepLabels.map((label, i) => (
                        <div key={i} className='flex flex-col items-center flex-1'>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: step > i ? primaryColour : step === i + 1 ? primaryColour : '#e5e7eb',
                                color: step >= i + 1 ? '#fff' : '#6b7280',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: 14,
                                transition: 'background 0.3s'
                            }}>
                                {step > i + 1 ? '✓' : i + 1}
                            </div>
                            <span style={{ fontSize: 11, color: step === i + 1 ? primaryColour : '#9ca3af', marginTop: 4, fontWeight: step === i + 1 ? 700 : 400 }}>
                                {label}
                            </span>
                            {/* Connector line */}
                            {i < 2 && (
                                <div style={{
                                    position: 'absolute',
                                    display: 'none'
                                }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Error message */}
                {error && (
                    <div style={{
                        background: '#fee2e2', border: '1px solid #fca5a5',
                        borderRadius: 8, padding: '10px 14px',
                        color: '#dc2626', fontSize: 13, fontWeight: 500,
                        marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                {/* Success message */}
                {success && (
                    <div style={{
                        background: '#dcfce7', border: '1px solid #86efac',
                        borderRadius: 8, padding: '10px 14px',
                        color: '#16a34a', fontSize: 13, fontWeight: 500,
                        marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8
                    }}>
                        ✅ {success}
                    </div>
                )}

                {/* Step 1: Enter Email */}
                {step === 1 && (
                    <div>
                        <label className='block text-gray-700 font-medium mb-1'>Email Address</label>
                        <input
                            type="email"
                            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 mb-4'
                            placeholder='Enter your registered email'
                            onChange={(e) => { setEmail(e.target.value); setError("") }}
                            value={email}
                            onKeyDown={(e) => e.key === 'Enter' && handelsendOtp()}
                        />
                        <button
                            className='w-full mt-2 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323] disabled:opacity-60'
                            onClick={handelsendOtp}
                            disabled={loading}
                        >
                            {loading ? '⏳ Sending...' : '📧 Send OTP'}
                        </button>
                        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 12, textAlign: 'center' }}>
                            We'll send a 4-digit OTP to your email
                        </p>
                    </div>
                )}

                {/* Step 2: Verify OTP */}
                {step === 2 && (
                    <div>
                        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
                            OTP sent to <strong style={{ color: primaryColour }}>{email}</strong>
                            <br />Check your inbox and spam folder.
                        </p>
                        <label className='block text-gray-700 font-medium mb-1'>Enter OTP</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 text-center text-2xl font-bold tracking-[0.5em]'
                            placeholder='_ _ _ _'
                            onChange={(e) => { setOtp(e.target.value); setError("") }}
                            value={otp}
                            onKeyDown={(e) => e.key === 'Enter' && handelverifyOtp()}
                        />
                        <button
                            className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323] disabled:opacity-60'
                            onClick={handelverifyOtp}
                            disabled={loading}
                        >
                            {loading ? '⏳ Verifying...' : '✅ Verify OTP'}
                        </button>
                        <button
                            style={{ width: '100%', marginTop: 8, background: 'none', border: 'none', color: primaryColour, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
                            onClick={() => { setStep(1); setError(""); setSuccess(""); setOtp("") }}
                        >
                            ← Wrong email? Go back
                        </button>
                    </div>
                )}

                {/* Step 3: New Password */}
                {step === 3 && (
                    <div>
                        <label className='block text-gray-700 font-medium mb-1'>New Password</label>
                        <input
                            type="password"
                            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 mb-4'
                            placeholder='Enter new password (min 6 chars)'
                            onChange={(e) => { setNewPassword(e.target.value); setError("") }}
                            value={newPassword}
                        />
                        <label className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                        <input
                            type="password"
                            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 mb-4'
                            placeholder='Confirm new password'
                            onChange={(e) => { setconfirmPassword(e.target.value); setError("") }}
                            value={confirmPassword}
                            onKeyDown={(e) => e.key === 'Enter' && handelResetPassword()}
                        />
                        <button
                            className='w-full mt-2 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323] disabled:opacity-60'
                            onClick={handelResetPassword}
                            disabled={loading}
                        >
                            {loading ? '⏳ Resetting...' : '🔒 Reset Password'}
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ForgotPassword
