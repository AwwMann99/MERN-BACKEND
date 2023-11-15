const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validToken = asyncHandler(async (req,res,next)=>{
    let token;
   const auth = req.headers.authorization||req.headers.Authorization
    if(auth&& auth.startsWith("Bearer")){
       const token =  auth.split(" ")[1];
       jwt.verify(token,process.env.ACCESS_TKN,(err,decoded)=>
       {
        if(err){
            res.status(401);
            throw new Error("User not authorized");
        }
        req.login = decoded.login;
        next();
       });
if(!token){
    res.status(400);
    throw new Error("User not authorized or token not there");
}

}});
module.exports=validToken;