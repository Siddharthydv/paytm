const express=require("express");
const mainrouter=require("./routes/route")
const app=express();
const cors=require("cors")
const bodyparser=require("body-parser")
app.use(bodyparser.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:["Content-Type","email","password"]}))
app.use("/api/vi",mainrouter)
app.listen(3000)
