const express=require("express")
const router=express.Router();
const userrouter=require("./useroute")
const accountrouter=require("./accountroute")
router.use("/user",userrouter)
router.use("/account",accountrouter)
router.get("/",(req,res,next)=>{
    res.send("inroutesindex")
})

module.exports=router