
import React, { useState } from 'react';
import foodgoLogo from "../assets/image.png"
import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../Redux/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';


function Nav() {
    const { userData, currentCity } = useSelector(state => state.user);
    const { myShopData } = useSelector(state => state.owner);
    const cartCount = useSelector(state => state.cart.items.reduce((s, i) => s + i.quantity, 0));
    const [showInfo, setShowInfo] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '')
    const isOwner = userData?.role === "owner"
    const hideOwnerActions = currentPath === '/create-edit-shop'

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/singout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex items-center justify-between gap-4 bg-white shadow-md px-6 py-4'>
            <img src={foodgoLogo} alt="FoodGo" className='shrink-0 h-7 w-[70px] md:h-10 md:w-[100px] lg:h-14 lg:w-[120px] cursor-pointer'
                style={{ borderRadius: '20%' }} onClick={() => navigate('/')} />
            {userData?.role == "user" && (
                <div className="flex items-center w-[30%] gap-[10px] overflow-hidden">
                    <FaLocationDot className="w-[20px] h-[25px] text-amber-700" />
                    <span className="truncate text-gray-600">{currentCity}</span>
                </div>
            )}

            <div className='flex shrink-0 items-center gap-[15px]'>

                {isOwner && !hideOwnerActions &&
                    <>
                        {!myShopData ? (
                            <button
                                className="hidden md:flex items-center gap-1 p-2.5 cursor-pointer rounded-full bg-amber-700 text-amber-100"
                                onClick={() => navigate('/create-edit-shop')}
                            >
                                <FaPlus size={20} />
                                <span>Create Shop</span>
                            </button>
                        ) : (
                            <>
                                <button
                                    className="hidden md:flex items-center gap-1 p-2.5 cursor-pointer rounded-full bg-amber-700 text-amber-100"
                                    onClick={() => navigate('/add-items')}
                                >
                                    <FaPlus size={20} />
                                    <span>Add Food item</span>
                                </button>

                                <button
                                    className="md:hidden flex items-center justify-center p-2.5 cursor-pointer rounded-full bg-amber-700 text-amber-100"
                                    onClick={() => navigate(myShopData ? '/add-items' : '/create-edit-shop')}
                                >
                                    <FaPlus size={20} />
                                </button>
                            </>
                        )}
                    </>
                }

                {!isOwner && (
                    <div
                        className='relative cursor-pointer mr-[5px] mb-[5px]'
                        onClick={() => navigate('/cart')}
                        title="View cart"
                    >
                        <FaShoppingCart size={25} className='text-amber-700' />
                        <span style={{
                            position: 'absolute', top: -10, right: -10,
                            background: cartCount > 0 ? '#dc2626' : '#b45309',
                            color: '#fff',
                            fontSize: 11, fontWeight: 800,
                            minWidth: 18, height: 18,
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '0 3px',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                            transition: 'transform 0.2s',
                            transform: cartCount > 0 ? 'scale(1.15)' : 'scale(1)',
                        }}>
                            {cartCount}
                        </span>
                    </div>
                )}

                {!isOwner && (
                    <button className='hidden md:block px-3 py-1 rounded-lg bg-amber-950/10 text-amber-700 text-sm font-medium cursor-pointer'>
                        My Orders
                    </button>
                )}

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
