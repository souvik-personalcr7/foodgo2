import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setUserData } from '../Redux/userSlice';

const SingIn = () => {
    const primaryColour = '#ff4d2d';
    const hoverColour = '#e64323';
    const bgColour = '#fff9f6';
    const borderColur = '#ddd';

    const [showPassword, setShowPassword] = useState(false)
    //const [role, setRole] = useState("user")
    const navigate = useNavigate()
    //const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    //const [mobile, setMobile] = useState("")
    const dispatch = useDispatch()

    const handleSingIn = async () => {
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/singin`,
                {

                    email,
                    password,

                },
                { withCredentials: true }
            )
            dispatch(setUserData(result.data))
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    


    const handleGoogleAuth = async () => {
        console.log("clicked");
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const { data } = await axios.get(
                `${serverUrl}/api/auth/google-auth`,
                { email: result.user.email },
                { withCredentials: true }
            );

            console.log(data);
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };


    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColour }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`} style={{ border: `1px solid ${borderColur}` }}>
                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColour }}>FoodGo</h1>
                <p className='text-gray-600 mb-8'>Sing In to your account  your account to get started with delicious food deliveries</p>

                {/* Full Name */}
                {/* <div className='mb-4'>
                    <label className='block text-gray-750 font-medium mb-1'>Fullname</label>
                    <input
                        type="text"
                        className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your fullname'
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                    />
                </div> */}

                {/* Email */}
                <div className='mb-4'>
                    <label className='block text-gray-750 font-medium mb-1'>Email</label>
                    <input
                        type="email"
                        className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your Email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                {/* Number */}
                {/* <div className='mb-4'>
                    <label className='block text-gray-750 font-medium mb-1'>Number</label>
                    <input
                        type="tel"
                        className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your mobile number'
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                    />
                </div> */}

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-750 font-medium mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                    <div className='text-right mb-4 text-[#ff4d2d] cursor-pointer mt-2.5 font-medium'
                        onClick={() => navigate("/forgotpassword")}>
                        forgot password
                    </div>
                </div>

                {/* Role */}
                {/* <div className="mb-4">
                    <label className="block text-gray-750 font-medium mb-1">Role</label>
                    <div className="flex gap-2">
                        {["user", "owner", "delivery boy"].map((r) => (
                            <button key={r}
                                className='flex border rounded-lg px-3 py-1 text-center font-medium transition-color cursor-pointer'
                                onClick={() => setRole(r)}
                                style={role === r
                                    ? { backgroundColor: primaryColour, color: 'white' }
                                    : { border: `1px solid ${primaryColour}`, color: '#333' }}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div> */}

                <button
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]'
                    onClick={handleSingIn}>
                    Sing In
                </button>

                <button
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-gray-100 hover:bg-gray-200 cursor-pointer'
                    onClick={handleGoogleAuth}>
                    <FcGoogle size={20} />
                    <span>Sign In with Google</span>
                </button>

                <p className='text-center mt-2'>
                    Want create a new  account?{' '}
                    <span
                        className='text-[#ff4d2d] cursor-pointer'
                        onClick={() => navigate("/singup")}
                    >
                        Sing Up
                    </span>
                </p>
            </div>
        </div>
    )
}


export default SingIn

