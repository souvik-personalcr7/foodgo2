
import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { IoReceipt } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../Redux/userSlice';
import { useLocation } from 'react-router-dom';


function Nav() {
    const { userData, currentCity } = useSelector(state => state.user);
    const { myShopData } = useSelector(state => state.owner);
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const dispatch = useDispatch()
    const location = useLocation()
    const hideSearch = location.pathname === '/create-edit-shop'
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/singout`, { withCredentials: true })

            dispatch(setUserData(null))

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className='flex items-center justify-between bg-white shadow-md px-6 py-4'>


            {showSearch && userData.role == "user" && !hideSearch && (
                <div className='w-[80%] bg-white shadow-xl rounded-lg items-center gap-[20px] h-[70px] flex fixed top-[70px] left-[5%] z-[9999] md:hidden'>
                    <div className="flex items-center w-full border-gray-400 px-[10px] gap-[10px]">
                        <div className="flex items-center w-[30%] gap-[10px] overflow-hidden ">
                            <FaLocationDot className="w-[20px] h-[25px] text-amber-700" />
                            <span className="truncate text-gray-600">{currentCity}</span>
                        </div>
                        <div className="flex items-center w-[70%] gap-[10px]">
                            <FaSearch
                                size={25}
                                className="text-amber-700 cursor-pointer"
                                onClick={() => setShowSearch(prev => !prev)}
                            />
                            <input
                                type="text"
                                placeholder="Search your food"
                                className="px-[10px] text-gray-700 outline-0 w-full"
                            />
                        </div>
                    </div>
                </div>
            )}


            <h1 className='text-3xl font-bold mb-2 text-amber-700'>FoodGo</h1>

            {userData.role == "user" &&
                (<div className="flex items-center w-[30%] gap-[10px] overflow-hidden ">
                    <FaLocationDot className="w-[20px] h-[25px] text-amber-700" />
                    <span className="truncate text-gray-600">{currentCity}</span>
                </div>)}


            {!hideSearch && (
                <div className='md:w-[60%] lg:w-[40%] bg-white shadow-xl rounded-lg items-center gap-[20px] h-[70px] hidden md:flex'>
                    <div className="flex items-center w-full border-gray-400 px-[10px] gap-[10px]">

                        <div className="flex items-center w-[70%] gap-[10px]">
                            <FaSearch size={25} className="text-amber-700 cursor-pointer" />
                            <input
                                type="text"
                                placeholder="Search your food"
                                className="px-[10px] text-gray-700 outline-0 w-full"
                            />
                        </div>
                    </div>
                </div>
            )}


            <div className='flex items-center gap-[15px]'>
                {!hideSearch && (showSearch ? <RxCross2 className="text-amber-700 md:hidden cursor-pointer"
                    onClick={() => setShowSearch(false)} /> : <FaSearch
                    size={25}
                    className="text-amber-700 md:hidden cursor-pointer"
                    onClick={() => setShowSearch(true)}
                />)}

                {userData.role === "owner" && !hideSearch &&
                    <>
                        {myShopData &&
                            
                            <>

                                <button
                                    className="hidden md:flex items-center gap-1 p-2.5 cursor-pointer rounded-full
                           bg-amber-700 text-amber-100"
                                >
                                    <FaPlus size={20} />
                                    <span>Add Food item</span>
                                </button>


                                <button
                                    className="md:hidden flex items-center justify-center p-2.5 cursor-pointer rounded-full
                           bg-amber-700 text-amber-100"
                                >
                                    <FaPlus size={20} />
                                </button>



                                <div className="flex items-center gap-2 cursor-pointer relative px-3 py-2 rounded-full bg-amber-700 text-amber-50 font-medium">

                                    <IoReceipt size={20} />

                                    <span className="hidden md:inline">My Order</span>


                                    <span className="absolute -right-2 -top-2 text-xs font-bold text-amber-50 bg-amber-700 rounded-full px-[6px] py-[2px]">
                                        0
                                    </span>
                                </div>
                            </>}

                    </>
                }



                <div className='relative cursor-pointer mr-[5px] mb-[5px]'>
                    <FaShoppingCart size={25} className='text-amber-700' />
                    <span className='absolute right-[-9px] top-[-12px] text-amber-700'>0</span>
                </div>


                <button className='hidden md:block px-3 py-1 rounded-lg bg-amber-950/10 text-amber-700 text-sm font-medium cursor-pointer'>
                    My Orders
                </button>


                <div
                    className='bg-amber-700 text-amber-50 w-[40px] h-[40px] rounded-2xl flex items-center justify-center
          shadow-xl font-bold mr-[10px] text-[18px] cursor-pointer'
                    onClick={() => setShowInfo(prev => !prev)}
                >
                    {userData?.fullName?.slice(0, 1) || "U"}
                </div>


                {showInfo && (
                    <div className='fixed top-[80px] right-[10px] md:right-[10%] lg:right-[20%] w-[180px] 
          bg-white shadow-2xl p-[20px] flex flex-col gap-[10px] z-[9999] rounded-2xl'>
                        <div className='text-[17px] font-semibold'>
                            {userData?.fullName || "Guest"}
                        </div>
                        <div className='md:hidden text-amber-700 font-semibold cursor-pointer'>
                            My Order
                        </div>
                        <div className='text-amber-800 bg-amber-100 p-3 rounded-2xl cursor-pointer' onClick={handleLogOut}>
                            Log Out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;

