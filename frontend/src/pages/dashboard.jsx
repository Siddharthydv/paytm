import Appbar from "../components/Appbar"
import Balance from "../components/balance"
import Usercom from "../components/usercom"
import { balance } from "../atoms/balance"
import { useRecoilValue } from "recoil"
export default function Dashboard(){
    return <div className="h-screen bg-slate-300">
       <Appbar/>
       <div className="mt-4">
       <Balance value={useRecoilValue(balance)}/>
      </div>
      <Usercom/>
    </div>
}