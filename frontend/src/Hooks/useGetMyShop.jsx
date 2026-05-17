import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../Redux/ownerSlice";
//import { setUser } from "../redux/userSlice";  // adjust path

function useGetMyShop() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/shop/get-my`,
                    { withCredentials: true }
                );
                dispatch(setMyShopData(result.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchShop();
    }, [dispatch]);
}

export default useGetMyShop;
