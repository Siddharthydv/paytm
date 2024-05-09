import { Heading } from "../components/Heading";
import Inputbox from "../components/Inputbox";
import { Button } from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
export default function Sendmoney({Friendname}){
    const[searchparams]=useSearchParams();
    const id=searchparams.get("id")
    const name=searchparams.get("name");
    const [amount,setAmount]=useState(0);
    return <div className="bg-slate-400 h-screen flex flex-row justify-center">
        <div className="w-80 flex flex-col justify-center">
            <div className="bg-white text-center pt-4 rounded-md">
                <Heading label={"Send Money"}/>
                <div className=" pt-16">
                    <div className="pl-4 pr-4">
                        <Name label={name}/>
                        <Amountbar amount={amount} id={id} setAmount={setAmount}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
function Name({label}){
    return <div className= "flex flex-row margin ">
         <div className=" bg-green-400 rounded-full h-12 w-12 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {label[0]}
                </div>
            </div>
        <div className="flex items-center text-md" >{label}</div>
    </div>
}
function Amountbar({amount,setAmount,id}){
    return <div className="text-left">
       <div className="pt-10">Amount in rs</div>
        <Inputbox onchange={(e)=>{
            setAmount(e.target.value)
        }}/>
        <div className="pt-2">
        <Button className="mt-4" label={"Send Money"} onClick={async ()=>{
            const token=localStorage.getItem("token")
            console.log(token)
            await axios.post("http://localhost:3000/api/vi/account/transfer", {
                toid: id,
                amount
            }, {
                headers:{
                    'Authorization':token
                }
            })
        }}/>
        </div>
    </div>
}