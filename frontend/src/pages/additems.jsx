import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
function AddItems() {
    const Navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const [foodName, setFoodName] = useState("")
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFrontendImage(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Food Item:", foodName)
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
                    Add Your Food

                </div>
                {myShopData && (
                    <div className='mb-6 rounded-xl bg-amber-50 p-4'>
                        <h2 className='text-center text-amber-900 font-bold uppercase'>{myShopData.name}</h2>
                        {myShopData.image && (
                            <img
                                src={myShopData.image}
                                alt={myShopData.name}
                                className='mt-3 w-full h-40 object-cover rounded-lg border border-amber-200'
                            />
                        )}
                    </div>
                )}

                <form className='space-y-4 sm:space-y-5' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-amber-100 mb-1 sm:mb-2'>Food Name</label>
                        <input type="text" placeholder='Enter Food Name'
                            className='w-full px-4 py-2 bg-white text-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-amber-200 transition-shadow' onChange={(e) => setFoodName(e.target.value)} value={foodName} />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-amber-100 mb-1 sm:mb-2'>Food Image</label>
                        <input type="file" accept='image/*'
                            className='w-full px-4 py-2 bg-white text-gray-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 
                            focus:ring-amber-200 transition-shadow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100' onChange={handleImage} />
                        {frontendImage && <div className='mt-4 sm:mt-5'>
                            <img src={frontendImage} alt="" className='w-full h-48 sm:h-64 object-cover rounded-lg border-2 border-amber-200 shadow-sm' />
                        </div>}


                    </div>




                    <button type='submit' className='w-full bg-amber-50 text-amber-900 mt-4 sm:mt-6 px-6 py-3 rounded-lg font-bold text-lg
                          shadow-md hover:bg-amber-100 hover:shadow-lg transition-all duration-200 cursor-pointer'>
                        Add Food
                    </button>

                </form>

            </div>

        </div>
    )
}

export default AddItems
