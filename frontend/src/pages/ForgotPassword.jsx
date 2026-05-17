import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
//..................................................................................................................................
//..................................................................................................................................
const primaryColour = '#ff4d2d';
const hoverColour = '#e64323';
const bgColour = '#fff9f6';
const borderColur = '#ddd';
//....................................................................................................................................
//....................................................................................................................................
function ForgotPassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const navigate = useNavigate()
    //....................................................................................................................................
    //....................................................................................................................................
    const handelsendOtp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email },
                { withCredentials: true })
            console.log(result)
            setStep(2)

        } catch (error) {
            console.log(error)
        }
    }

    const handelverifyOtp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp },
                { withCredentials: true })
            console.log(result)
            setStep(3)

        } catch (error) {
            console.log(error)
        }
    }


    const handelResetPassword = async () => {
        if (newPassword != confirmPassword) {
            return null
        }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword },
                { withCredentials: true })
            console.log(result)
            navigate("/singin")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 '>
                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack size={40} className='text-[#ff4d2d] cursor-pointer '
                        onClick={() =>
                            navigate("/singin")
                        } />
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
                </div>
                {step == 1
                    &&
                    <div>
                        <div className='mt-8'>
                            <label className='block text-gray-750 font-medium mb-1'>Email</label>
                            <input
                                type="email"
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                                placeholder='Enter your Email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <button
                                className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]'
                                onClick={handelsendOtp}>
                                Send OTP
                            </button>
                        </div>

                    </div>}

                {/* ............................................................................................ */}
                {/* ............................................................................................ */}
                {step == 2
                    &&
                    <div>
                        <div className='mt-8'>
                            <label className='block text-gray-750 font-medium mb-1'>Enter OTP</label>
                            <input
                                type="email"
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                                placeholder='Enter your OTP'
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                            />
                            <button
                                className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]'
                                onClick={handelverifyOtp} >
                                verify OTP
                            </button>
                        </div>

                    </div>}

                {/* ..................................................................................................... */}
                {/* ..................................................................................................... */}
                {step == 3
                    &&
                    <div>
                        <div className='mt-8'>
                            <label className='block text-gray-750 font-medium mb-1'>New Password</label>
                            <input
                                type=""
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                                placeholder='New Password'
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                            />
                            <label className='block text-gray-750 font-medium mb-1'>Confirm Password</label>
                            <input
                                type=""
                                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                                placeholder='Confirm Password'
                                onChange={(e) => setconfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />

                            <button
                                className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]'
                                onClick={handelResetPassword}>
                                Reset Password
                            </button>
                        </div>

                    </div>}
            </div>
        </div>
    )
}

export default ForgotPassword
