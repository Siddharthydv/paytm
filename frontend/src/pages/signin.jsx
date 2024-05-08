import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import Inputbox from "../components/Inputbox"
import { Button } from "../components/Button"
import BottomWarning  from "../components/Bottomwarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { balance } from "../atoms/balance"
import { useRecoilState } from "recoil"
export default function Signin(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const[value,setValue]=useRecoilState(balance)
    return <div className="flex flex-row h-screen justify-center py-10 bg-slate-400">
    <div className="bg-slate-500 w-96 flex flex-col justify-center ">
      <div className="bg-white text-center rounded-lg h-max p-2 px-4">
        <Heading label={"Sign In"}/>
        <Subheading label={" Enter your information to sign in to your account"}/>
        <Inputbox onchange={(e)=>{setEmail(e.target.value)}} label={"Email"} placeholder={"sid9@gmail.com"}/>
        <Inputbox onchange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"******"}/>
        <div className="pt-4">
          <Button onClick={async()=>{
            console.log(email)
            console.log(password)
            const response=await axios.post(("http://localhost:3000/api/vi/user/signin"),{},{
              headers:{
                'email':email,
                'password':password}
              })
              localStorage.setItem("token",response.data.token)
              setValue(response.data.balance)
              navigate("/dashboard")
            console.log(response)
          }} label={"Sign in"}/>
        </div>
        <BottomWarning label={"Do not have an account?"} buttonText={"Sign up"} to={"/signup"} /> 
         </div>
    </div>
  </div>
}