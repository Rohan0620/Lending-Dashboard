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
import Dashboard from '../pages/Dashboard/Dashboard'

import Loans from '../pages/Loans/Loans'

import PendingCustomer from '../pages/PendingCustomer/PendingCustomer'
import Repayment from '../pages/Repayments/Repayments'
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
            <Route exact path='/all_loans' element={<Loans/>}/>
            <Route exact path='/pendingcust' element={<PendingCustomer/>}/>
            <Route exact path='/pendingcustomer' element={<PendingCustomer/>}/>
            <Route exact path='/repay' element={<Repayment/>}/>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router