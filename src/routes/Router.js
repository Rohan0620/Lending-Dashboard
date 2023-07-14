import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
// import Home from '../pages/Home/Home'
import Home from '../pages/Home/Home'
import Auth from '../pages/auth/Auth'
import Register from '../pages/auth/Register'
import LenderInfo from '../pages/LenderInfo/Info'
import LenderLocation from '../pages/LenderLocation/LenderLocation'
import AddAccount from '../pages/addAccount/AddAccount'
import ApprovedCust from '../pages/Approvedcustomer/ApprovedCust'
import PendingCustomer from '../pages/PendingCustomer/PendingCustomer'
const Router = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Auth/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/addlenderinfo" element={<LenderInfo/>}/>
            <Route exact path="/addlenderloc" element={<LenderLocation/>}/>
            <Route exact path="/addaccount" element={<AddAccount/>}/>
            <Route exact path='/approvedcustomer' element={<ApprovedCust/>}/>
            <Route exact path='/pendingcustomer' element={<PendingCustomer/>}/>

        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router