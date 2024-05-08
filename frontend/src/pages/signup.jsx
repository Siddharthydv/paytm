import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import Inputbox from "../components/Inputbox"
import { Button } from "../components/Button"
import BottomWarning  from "../components/Bottomwarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
function Signup(){
  const [username,setUsername]=useState("asda");
  const [email,setEmail]=useState("asdadada");
  const [password,setPassword]=useState("adadasdas");
  const navigate=useNavigate()
    return  <div className="flex flex-row h-screen justify-center py-10 bg-slate-400">
    <div className="bg-slate-500 w-96 flex flex-col justify-center ">
      <div className="bg-white text-center rounded-lg h-max p-2 px-4">
        <Heading label={"Sign Up"}/>
        <Subheading label={" Enter your information to create an account"}/>
        <Inputbox onchange={(e)=>{setUsername(e.target.value);}} label={"User Name"} placeholder={"John"}/>
        <Inputbox onchange={(e)=>{setEmail(e.target.value)}} label={"Email"} placeholder={"sid9@gmail.com"}/>
        <Inputbox onchange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"******"}/>
        <div className="pt-4">
          <Button onClick={
            async()=>{
              console.log(username)
              const response=await axios.post("http://localhost:3000/api/vi/user/signup",{
                username:username,
                email:email,
                password:password
              });
              console.log(username)
              localStorage.setItem("token",response.data.token)
              navigate("/dashboard")
            }
          }label={"Sign up"}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} /> 
         </div>
    </div>
  </div>
}
export default Signup