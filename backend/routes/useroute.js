const express=require("express")
const router=express.Router();
const z=require("zod")
const {user}=require("../db")
const jwt=require("jsonwebtoken")
const jwtsecret=require("../config")
const jwtverify=require("../middleware/jwtverify");
const {account}=require("../db")
router.post("/signup",async (req,res)=>{
//zod checking 
    const zodm=z.object({
        email:z.string(),
        username:z.string(),
        password:z.string().min(5)
    })
    const check=zodm.safeParse(req.body);
    console.log('hello')
    if(!check.success){
        res.send("invalid sddsformat")
        return;}
        
//checking if user already exists 
    const email=req.body.email;
    const existingaccount=await user.findOne({email:email});
    // console.log(account)
    if(existingaccount){
        res.send("account exists");return;}
    const username=req.body.username;
    const password=req.body.password;
    const newuser=await user.create({
        email:email,
        username:username,
        password:password
    })
    await newuser.save();
    const id=newuser._id;
//making an account of the newuser
const newaccount=await account.create({
    userid:id,
    balance:1000
})
await newaccount.save();
//generating a token
    const payload={
        id:id
    }
    const token=jwt.sign(payload,jwtsecret)
    res.json({
        mssg:"token created",
        token:token
    }).status(200)
})

router.post("/signin",async (req,res)=>{
    const email=req.headers.email;
    const password=req.headers.password;
    console.log(password)
    const newuser=await user.findOne({email:email,password:password});
    if(!newuser)
        {
            res.send("User not founddddd")
            return;
        }
    const id=newuser._id
    const payload={
        id:id
    }
    req.id=id;
    // console.log(req.id)
    const balance=await account.findOne({userid:id})

    try{
    const token=jwt.sign(payload,jwtsecret)
    res.json({
        mssg:"token created",
        token:token,
        balance:balance.balance
    }).status(200)
    }catch(error){
        res.send("error while logging in")
    }   
})

router.put("/",jwtverify,async (req,res)=>{
    const newemail=req.body.newemail;
    // console.log(newemail)
    // console.log(req.id)
    try{
        const User=await user.findByIdAndUpdate(req.id,{email:newemail},{new:true})
        await User.save();
        // console.log(User)
        res.json(User).status(200)
    }catch(error){
        res.send("error while updating user");
    }
}
)

router.get("/bulk", jwtverify,async(req,res)=>{
    const filter=req.query.filter||"";
    const users=await user.find({
        username:{$regex:filter} })
        .catch(err=>res.send("error while bulking"))
        res.json({
            user: users.map(user => ({
                username: user.username,
                _id: user._id
            }))
        })
    }
    )
module.exports=router;