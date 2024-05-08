const jwt=require("jsonwebtoken");
const jwtsecret=require("../config.js")
function jwtverify(req,res,next){
    const token=req.headers.authorization;
    if(jwt.verify(token,jwtsecret))
        {
            const decoded=jwt.decode(token,jwtsecret);
            // console.log(decoded)
            req.id=decoded.id;
            // console.log(req.id)
            next();
        }
    else
        res.send("token not valid").status(404);
}
module.exports=jwtverify;