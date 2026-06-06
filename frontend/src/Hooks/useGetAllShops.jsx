import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setAllShops } from "../Redux/userSlice";

function useGetAllShops() {
  const dispatch = useDispatch();
  const { isAuthResolved } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthResolved) return;

    const fetchAllShops = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/all`, {
          withCredentials: true,
        });
        dispatch(setAllShops(result.data.shops || []));
      } catch (error) {
        console.log("Error fetching shops:", error);
        dispatch(setAllShops([]));
      }
    };

    fetchAllShops();
  }, [dispatch, isAuthResolved]);
}

export default useGetAllShops;
