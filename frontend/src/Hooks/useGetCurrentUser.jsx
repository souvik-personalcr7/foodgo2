// import { linkWithCredential } from 'firebase/auth'
// import React from 'react'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// function useGetCurrentUser() {
//     const dispatch = useDispatch()
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const result = await axios.get(`${serverUrl}/api/user/current`,
//                     {withCredential: true })
//                dispatch(setUserData(result.data))
//             }
//             catch (error) {
//                 console.log(error)
//             }
//         } 
//         fetchUser()
//     }, [])
// }

// export default useGetCurrentUser      

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";   
import { setUserData, setIsAuthResolved } from "../Redux/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }  
        );
        dispatch(setUserData(result.data)); 
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsAuthResolved(true));
      }
    };
    fetchUser();
  }, [dispatch]); 
}

export default useGetCurrentUser;
