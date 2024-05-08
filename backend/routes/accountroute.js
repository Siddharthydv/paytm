const express=require("express");
const router=express.Router();
const mongoose=require("mongoose")
const {account, user}=require("../db")
const jwtverify=require("../middleware/jwtverify")
router.get("/balance",jwtverify,async (req,res)=>{
    const useracc=await account.findOne({userid:req.id});
    console.log(req.id)
    res.send(useracc)
})

router.post("/transfer",jwtverify,async (req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    const{toid,amount}=req.body;

    const sender=await account.findOne({userid:req.id}).session(session);
    if(!sender||account.balance<amount)
        {
            await session.abortTransaction();
            console.log("error in sender account")
            return ;
        }
    const receiver=await account.findOne({userid:toid}).session(session);
    if(!receiver)
        {
            await session.abortTransaction();
            console.log("error in receiver")
            return;
        }
    await account.updateOne({userid:req.id},{$inc:{balance:-amount}}).session(session);
    await account.updateOne({userid:toid},{$inc:{balance:amount}}).session(session);
    await session.commitTransaction();
    console.log("done")
})  
module.exports= router