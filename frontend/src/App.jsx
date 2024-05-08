import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Signup from './pages/signup'
import Signin from './pages/signin'
import Dashboard from './pages/dashboard'
import Sendmoney from './pages/sendmoney'
import { RecoilRoot } from 'recoil'
function App() {
  return (
    <>
    <RecoilRoot>
     <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<Sendmoney/>}/>
        </Routes>
     </BrowserRouter>
     </RecoilRoot>
    </>
  )
}
export default App
