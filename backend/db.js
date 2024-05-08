const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://yadsid9:saumya%4053@cluster0.jbgagll.mongodb.net/")
const userschema=new mongoose.Schema({
    email:String,
    username:String,
    password:String,
})
const user=mongoose.model('user',userschema);

const accountschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const account =mongoose.model("account",accountschema);

module.exports={
    user,
    account
}