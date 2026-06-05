import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SingUP from './pages/SingUP'
import SingIn from './pages/SingIn'
import ForgotPassword from './pages/ForgotPassword'
import CreateEditShop from './pages/CreateEditShop'

import useGetCurrentUser from './Hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import OwnerdDashbord from './components/OwnerdDashbord'
import Home from './pages/Home'
import Nav from './components/Nav'
import useGetCity from './Hooks/UseGetCity'
import useGetMyShop from './Hooks/useGetMyShop'
import AddItems from './pages/additems'
import EditItems from './pages/EditItems'


export const serverUrl = "http://localhost:8000"

function App() {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  const location = useLocation()
  const { userData, isAuthResolved } = useSelector(state => state.user)
  const hideNavRoutes = ['/singup', '/singin', '/forgotpassword']
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, '')
  const showNav = !hideNavRoutes.includes(currentPath)
  
  if (!isAuthResolved) {
    return <div className="flex justify-center items-center min-h-screen text-amber-700 font-bold text-2xl">Loading...</div>
  }

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path='/singup' element={!userData ? <SingUP /> : <Navigate to={"/"} />} />
        <Route path='/singin' element={!userData ? <SingIn /> : <Navigate to={"/"} />} />
        <Route path='/forgotpassword' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
        <Route path='/' element={userData ? <Home /> : <Navigate to={"/singin"} />} />
        <Route path='/create-edit-shop' element={userData ? <CreateEditShop /> : <Navigate to={"/singin"} />} />
        <Route path='/owner/dashboard' element={userData?.role === 'owner' ? <OwnerdDashbord /> : <Navigate to={"/"} />} />
        <Route path='/Ownerdashboard' element={<Navigate to={'/owner/dashboard'} replace />} />
        <Route path='/add-items' element={userData?.role === 'owner' ? <AddItems /> : <Navigate to={"/singin"} />} />
        <Route path='/add-items/:itemId' element={userData?.role === 'owner' ? <AddItems /> : <Navigate to={"/singin"} />} />
        <Route path='/additems' element={<Navigate to={'/add-items'} replace />} />
        <Route path='/Deliverydashboard' element={<Navigate to={'/'} replace />} />
        <Route path='/edit-item' element={userData?.role === 'owner' ? <EditItems /> : <Navigate to={"/add-items"} />} />
      </Routes>
    </>
  )
}

export default App
