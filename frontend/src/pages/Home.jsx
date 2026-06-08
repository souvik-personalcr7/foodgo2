import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserDashbord from '../components/UserDashbord'
import OwnerdDashbord from '../components/OwnerdDashbord'
import DeliveryDashbord from '../components/DeliveryBoy'
import Nav from '../components/Nav'
import WelcomePopup from '../components/WelcomePopup'

function Home() {
  const { userData } = useSelector(state => state.user)
  const showPopup = userData?.role === 'user' || userData?.role === 'owner'

  return (
    <>
      {showPopup && (
        <WelcomePopup
          userName={userData?.name}
          role={userData?.role}
        />
      )}
      <div className='w -[100vw] min-h-[100vh] pt - [100px] flex flex-col items-center bg-amber-100' >
        {userData.role == "user" && <UserDashbord />}
        {userData.role == "owner" && <OwnerdDashbord />}
        {userData.role == "delivery boy" && <DeliveryDashbord />}
      </div>
    </>
  )
}

export default Home
