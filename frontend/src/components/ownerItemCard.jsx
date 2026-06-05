import React, { useState } from 'react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setMyShopData } from '../Redux/ownerSlice';

function OwnerItemCard({ data }) {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const { myShopData } = useSelector(state => state.owner)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = async () => {
        if (!data?._id || isDeleting) return

        setDeleteError("")
        setIsDeleting(true)
        try {
            await axios.delete(`${serverUrl}/api/item/delete-item/${data._id}`, {
                withCredentials: true
            })

            dispatch(setMyShopData({
                ...myShopData,
                item: (myShopData?.item || []).filter((item) => item._id !== data._id)
            }))
            setShowConfirm(false)
        } catch (error) {
            setDeleteError(error?.response?.data?.message || "Unable to delete item.")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className='flex bg-amber-50 rounded-lg shadow-md overflow-hidden border border-amber-900 w-full max-w-2xl min-h-32'>
            <div className='w-36 min-h-32 shrink-0 bg-gray-50'>
                <img src={data.image} alt={data.name} className='w-full h-full object-cover' />
            </div>
            <div className='flex flex-1 flex-col justify-center gap-2 p-4 min-w-0'>
                <h2 className='text-xl font-bold text-amber-950 truncate'>{data.name}</h2>
                <div className='flex flex-wrap gap-2 text-sm'>
                    <span className='rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-900'>{data.category}</span>
                    <span className='rounded-full bg-white px-3 py-1 font-medium text-gray-700 capitalize'>{data.foodType}</span>
                </div>
                <p className='text-lg font-bold text-amber-800'>Rs {data.price}</p>
                {deleteError && <p className='text-sm font-medium text-red-600'>{deleteError}</p>}
            </div>
            <div className='flex items-start gap-2 p-3'>
                <button
                    type='button'
                    onClick={() => Navigate(`/add-items/${data._id}`, { state: { item: data } })}
                    title='Edit item'
                    aria-label={`Edit ${data.name}`}
                    className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200'
                >
                    <FaPen className='size-4' />
                </button>
                <button
                    type='button'
                    onClick={() => setShowConfirm(true)}
                    disabled={isDeleting}
                    title='Delete item'
                    aria-label={`Delete ${data.name}`}
                    className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
                >
                    <MdDelete className='size-6 cursor-pointer' />
                </button>
            </div>
            {showConfirm && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
                    <div className='w-full max-w-sm rounded-lg bg-white p-6 shadow-xl'>
                        <h2 className='mb-5 text-center text-xl font-bold text-amber-950'>Are you sure</h2>
                        <div className='flex justify-center gap-3'>
                            <button
                                type='button'
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className='rounded-lg bg-red-600 px-6 py-2 font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
                            >
                                {isDeleting ? "Deleting" : "Yes"}
                            </button>
                            <button
                                type='button'
                                onClick={() => setShowConfirm(false)}
                                disabled={isDeleting}
                                className='rounded-lg bg-gray-100 px-6 py-2 font-bold text-gray-800 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60'
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OwnerItemCard
