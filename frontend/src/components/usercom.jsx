import { useEffect, useState ,useMemo, useCallback} from "react";
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios"
export default function Usercom(){
    const [users,setUsers]=useState([])
   const[filter,setFilter]=useState("")
   useEffect(()=>{
        const rettoken=localStorage.getItem("token")
        console.log(rettoken)
        const response= axios.get("http://localhost:3000/api/vi/user/bulk",{
            headers:{
                'Authorization':rettoken
            }
         })
        .then(response=>{
            // console.log(response)
            setUsers(response.data.user)
        })
   },[])
    return <>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
    <div>
        {/* {console.log(users)} */}
        {users.map(user => <User user={user} />)}
    </div>
</>
}
function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.username[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.username}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.username);
            }} label={"Send Money"} />
        </div>
    </div>
}