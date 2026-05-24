import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../Redux/ownerSlice";

function useGetMyShop() {
    const dispatch = useDispatch();
    const { userData, isAuthResolved } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthResolved) return;

        if (userData?.role !== "owner") {
            dispatch(setMyShopData(null));
            return;
        }

        const fetchShop = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/shop/get-my`,
                    { withCredentials: true }
                );
                dispatch(setMyShopData(result.data));
            } catch (error) {
                if (error?.response?.status === 404) {
                    dispatch(setMyShopData(null));
                    return;
                }
                console.log(error);
            }
        };
        fetchShop();
    }, [dispatch, isAuthResolved, userData?.role]);
}

export default useGetMyShop;
