import React from 'react'
import { useSelector } from 'react-redux'
import UserDashbord from '../components/UserDashbord'
import OwnerdDashbord from '../components/OwnerdDashbord'
import DeliveryDashbord from '../components/DeliveryBoy'
import Nav from '../components/Nav'

function Home() {
  const { userData } = useSelector(state => state.user)
  return (
    <>

      <div className='w -[100vw] min-h-[100vh] pt - [100px] flex flex-col items-center bg-amber-100' >
        {userData.role == "user" && <UserDashbord />}
        {userData.role == "owner" && <OwnerdDashbord />}
        {userData.role == "delivery boy" && <DeliveryDashbord />}
      </div>
    </>
  )
}

export default Home
