import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase';
import { } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../Redux/userSlice';

const SingUp = () => {
    const primaryColour = '#ff4d2d';
    const hoverColour = '#e64323';
    const bgColour = '#fff9f6';
    const borderColur = '#ddd';

    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [err, setErr] = useState("")
    const [loding, setLoding] = useState(false)
    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoding(true);
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/singup`,
                {
                    fullName,
                    email,
                    password,
                    mobile,
                    role
                },
                { withCredentials: true }
            );


            localStorage.setItem("token", result.data.token);


            dispatch(setUserData(result.data.user));
            if (role === "owner") {
                navigate("/Ownerdashboard");
            } else if (role === "user") {
                navigate("/");
            } else if (role === "delivery boy") {
                navigate("/Deliverydashboard");
            }


            console.log("Singup Success:", result.data);
            setErr("");
        } catch (error) {
            console.error("Signup error:", error);
            setErr(error.response?.data?.message || "Singup failed");
        } finally {
            setLoding(false);
        }
    };


    //...............................................................................................................................
    //...............................................................................................................................

    const handleGoogleAuth = async () => {
        if (!mobile) {
            return setErr("enter your valid mobile number");
        }
        console.log("clicked")
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        try {
            const { deta } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile

            }, { withCredentials: true })
            console.log(deta);

        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };
    //..................................................................................................................................
    //..................................................................................................................................
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColour }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`} style={{ border: `1px solid ${borderColur}` }}>
                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColour }}>FoodGo</h1>
                <p className='text-gray-600 mb-8'>Create your account to get started with delicious food deliveries</p>

                {/* Full Name */}
                <div className='mb-4'>
                    <label className='block text-gray-750 font-medium mb-1'>Fullname</label>
                    <input
                        type="text"
                        className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your fullname'
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                    />
                </div>

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
                <div className='mb-4'>
                    <label className='block text-gray-750 font-medium mb-1'>Number</label>
                    <input
                        type="tel"
                        className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        placeholder='Enter your mobile number'
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                    />
                </div>

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
                </div>

                {/* Role */}
                <div className="mb-4">
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
                </div>

                <button
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 font-bold cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]'
                    onClick={handleSignUp}>
                    Sing Up
                </button>


                <button
                    className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 border-gray-100 hover:bg-gray-200 cursor-pointer'
                    onClick={handleGoogleAuth}>
                    <FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>
                {err && <p className='text-red-700 text-center'>*fill up the form*</p>}

                <p className='text-center mt-2'>
                    Already have an account?{' '}
                    <span
                        className='text-[#ff4d2d] cursor-pointer'
                        onClick={() => navigate("/singin")}
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SingUp
