import './App.scss'
import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Header from './Header/Header'

import Assortment from './Assortment/Assortment'
import AdminPanel from './AdminPanel/AdminPanel'
import Home from './Home/Home'
import Profile from './Profile/Profile'
import OrderList from './OrderList/OrderList'

import SignUp from './Authorization/SignUp/SIgnUp'
import SignIn from './Authorization/SignIn/SignIn'

// Custom Hooks
import { useApp } from '../hook/app'

// Utils

// Main Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const App: FC<any> = () => {
  const { load, isLoad, isAside } = useApp()

  useEffect(() => {
    load()
  }, [])

  if (!isLoad) return <div>Loading...</div>

  return (
    <div>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/restaurant/:url" element={<Assortment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
