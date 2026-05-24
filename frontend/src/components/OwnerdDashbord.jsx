import React from 'react'
import { useSelector } from 'react-redux'
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";

function OwnerdDashbord() {
  const { myShopData } = useSelector(state => state.owner)
  const Navigate = useNavigate()
  return (
    <div className='p-6'>

      {!myShopData &&
        <div className='flex justify-center items-center p-4 sm:p-6'>
          <div className=' w-full max-w-md bg-amber-50 rounded-2xl p-6 border border-gray-50 hover:shadow-xl
            transition-shadow duration-300'>
            <div className='flex flex-col items-center text-center'>
              <FaUtensils className='text-amber-700 w-16 h-16 sm:h-20 mb-4' />
              <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 '> Add your Shop </h2>
              <p className='text-gray-600 mb-4 text-sm sm:text-base'>
                Join our food delivery platform and reach thousands of customers every day
              </p>
              <button className=' bg-amber-700 text-white px-5 sm:px-6 py-2 rounded-full
              font-medium hover:bg-amber-900  transition-colors duration-200 shadow-gray-600 cursor-pointer'
                onClick={() => Navigate("/create-edit-shop")}>
                Add Shop
              </button>
            </div>

          </div>

        </div>}

      {myShopData &&
        <div className='w-full flex flex-col items-center gap-6 px-4 sm:px-6'>
          <h1 className='flex items-center gap-2 whitespace-nowrap text-3xl font-bold text-amber-700'>
            <FaUtensils className='text-amber-700 w-8 h-8 shrink-0' />
            Welcome to {myShopData.name}
          </h1>

          {myShopData.image &&
            <img src={myShopData.image} alt={myShopData.name} className='w-64 h-64 object-cover rounded-xl shadow-lg border-2 border-amber-200' />
          }

          <div className='bg-amber-50 rounded-xl p-4 sm:p-6 w-full max-w-md shadow-sm border border-amber-100 flex flex-col gap-2'>
            <div className='flex items-center justify-center w-full'>
              <h1 className='text-center font-bold uppercase text-amber-950'>{myShopData.name}</h1>
            </div>
            <div className='flex items-start gap-3'>
              <span className='font-semibold text-amber-900 min-w-[70px]'>Address:</span>
              <span className='text-gray-700'>{myShopData.address}</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='font-semibold text-amber-900 min-w-[70px]'>City:</span>
              <span className='text-gray-700'>{myShopData.city}</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='font-semibold text-amber-900 min-w-[70px]'>State:</span>
              <span className='text-gray-700'>{myShopData.state}</span>
            </div>
          </div>

     

          <button className='inline-flex items-center gap-2 whitespace-nowrap bg-amber-700 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-900 transition-colors duration-200 shadow-md cursor-pointer mt-2'
            onClick={() => Navigate("/create-edit-shop")}>
              <FaPen className='w-4 h-4 shrink-0' 
              onClick={()=> Navigate("/create-edit-shop")}
              />
            Edit Shop
          </button>

               <div className='w-full max-w-md bg-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm'>
            <div className='flex flex-col items-center text-center'>
              <FaUtensils className='text-amber-700 w-12 h-12 mb-3' />
              <h2 className='text-xl font-bold text-amber-900 mb-2'>Add Tour Food Items</h2>
              <p className='text-gray-600 text-sm sm:text-base mb-4'>
                Share your delious creations with our customer by addong them to the menu
              </p>
              <button
                className='bg-amber-700 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-900 transition-colors duration-200 cursor-pointer'
                onClick={() => Navigate("/add-items")}
              >
                Add food
              </button>
            </div>
          </div>
        </div>
      }


    </div>
  )
}

export default OwnerdDashbord
