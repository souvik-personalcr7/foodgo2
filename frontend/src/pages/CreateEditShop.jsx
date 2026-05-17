import React, { useRef, useState, useEffect } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMyShopData } from '../Redux/ownerSlice';
import axios from 'axios';


const serverUrl = "http://localhost:8000";



function CreateEditShop() {
    const Navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user)
    const [name, setName] = useState(myShopData?.name || "")
    const [address, setAddress] = useState(myShopData?.address || currentAddress)
    const [city, setCity] = useState(myShopData?.city || currentCity)
    const [state, setState] = useState(myShopData?.state || currentState)
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
    const [backendImage, setBackendImage] = useState(null)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (myShopData) {
            setName(myShopData.name || "");
            setCity(myShopData.city || "");
            setState(myShopData.state || "");
            setAddress(myShopData.address || "");
            setFrontendImage(myShopData.image || null);
        } else {
            if (currentCity) setCity(currentCity);
            if (currentState) setState(currentState);
            if (currentAddress) setAddress(currentAddress);
        }
    }, [currentCity, currentState, currentAddress, myShopData]);
    
    //const imageRef = useRef()
    const handelImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("city", city)
            formData.append("state", state)
            formData.append("address", address)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            console.log("Form Data: ", Object.fromEntries(formData));
            const result = await axios.post(`${serverUrl}/api/shop/create-edit-shop`, formData,
                { withCredentials: true })
            dispatch(setMyShopData(result.data.shop))
            Navigate("/owner/dashboard")
            console.log(result.data)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex justify-center flex-col items-center p-4 sm:p-6 
               bg-amber-50 relative min-h-screen'>

            <div>
                <IoMdArrowRoundBack className='absolute top-4 left-4 sm:top-6 sm:left-6 cursor-pointer 
                text-amber-900 transition-colors w-10 h-10 sm:w-12 sm:h-12 hover:text-amber-700' onClick={() => Navigate("/")} />
            </div >
            <div className='w-full max-w-lg bg-amber-600 rounded-2xl shadow-xl p-6 sm:p-8 border-orange-100 mt-12 sm:mt-0'>
                <div className='flex flex-col items-center mb-4 sm:mb-6'>
                    <FaUtensils className='text-amber-100 w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4' />
                </div>
                <div className='flex justify-center w-full text-amber-50 font-extrabold text-2xl sm:text-3xl mb-6'>
                    {myShopData ? "Edit Shop" : "Add Shop"}

                </div>
                <form className='space-y-4 sm:space-y-5' onSubmit={handelSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-amber-100 mb-1 sm:mb-2'>Name</label>
                        <input type="text" placeholder='Enter Shop Name'
                            className='w-full px-4 py-2 bg-white text-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-amber-200 transition-shadow' onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-amber-100 mb-1 sm:mb-2'>Shop Image</label>
                        <input type="file" accept='image/*'
                            className='w-full px-4 py-2 bg-white text-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-amber-200 transition-shadow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100' onChange={handelImage} />
                        {frontendImage && <div className='mt-4 sm:mt-5'>
                            <img src={frontendImage} alt="" className='w-full h-48 sm:h-64 object-cover rounded-lg border-2 border-amber-200 shadow-sm' />
                        </div>}


                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-amber-100 mb-1 sm:mb-2'>City</label>
                            <input type="text" placeholder='Enter Your City'
                                className='w-full px-4 py-2 bg-white text-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-amber-200 transition-shadow' onChange={(e) => setCity(e.target.value)} value={city} />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-amber-100 mb-1 sm:mb-2'>State</label>
                            <input type="text" placeholder='Enter Your State'
                                className='w-full px-4 py-2 bg-white text-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-amber-200 transition-shadow' onChange={(e) => setState(e.target.value)} value={state} />
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-amber-100 mb-1 sm:mb-2'>Address</label>
                        <input type="text" placeholder='Enter Your Address'
                            className='w-full px-4 py-2 bg-white text-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-amber-200 transition-shadow' onChange={(e) => setAddress(e.target.value)} value={address} />
                    </div>
                    <button className='w-full bg-amber-50 text-amber-900 mt-4 sm:mt-6 px-6 py-3 rounded-lg font-bold text-lg
                          shadow-md hover:bg-amber-100 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                        Save</button>

                </form>

            </div>

        </div>
    )
}

export default CreateEditShop
