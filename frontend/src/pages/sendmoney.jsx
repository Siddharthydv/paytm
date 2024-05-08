import { Heading } from "../components/Heading";
import Inputbox from "../components/Inputbox";
import { Button } from "../components/Button";
export default function Sendmoney({Friendname}){
    return <div className="bg-slate-400 h-screen flex flex-row justify-center">
        <div className="w-80 flex flex-col justify-center">
            <div className="bg-white text-center pt-4 rounded-md">
                <Heading label={"Send Money"}/>
                <div className=" pt-16">
                    <div className="pl-4 pr-4">
                        <Name label={Friendname}/>
                        <Amountbar/>
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
                    A
                </div>
            </div>
        <div className="flex items-center text-md" >{label}Friend</div>
    </div>
}
function Amountbar(){
    return <div className="text-left">
       <div className="pt-10">Amount in rs</div>
        <Inputbox/>
        <div className="pt-2">
        <Button className="mt-4" label={"Send Money"}/>
        </div>
    </div>
}