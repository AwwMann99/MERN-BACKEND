const jwt=require("jsonwebtoken")
const reg = require("../models/regSchema");
const asyncHandler  = require("express-async-handler");
const bcrypt = require("bcrypt");
const postreg  =asyncHandler( async (req,res)=>{

    const {email,username,password} = req.body;
    if(!email || !username || !password){
        res.status(400);
        throw new Error('Please fill all fields');
    }
        
    const regs  =await reg.findOne({email:email});
    
    if(regs){
        res.status(400)
        throw new Error ('Email already registered')
    }
    const hashpsw = await bcrypt.hash(password,10);
    console.log("hashed password",hashpsw);
    const user = await reg.create({
        username,
        email,
        password:hashpsw
    })
    if(user)
    {
        res.status(201);
        res.json({_id:user.id,email:user.email});
    }
   
    else{
    res.status(400);
    throw new Error("user data not valid");
    }
   
 
});
const postlogin = asyncHandler(async (req,res)=>{
    
    const {email,password}=req.body;
    if (!email||!password){
      res.status(400);
      throw new Error("Please enter the email and password");
    }
    const user = await reg.findOne({email});
    if(user && (await bcrypt.compare(password,user.password)))
    {

        const acT = jwt.sign({
            login:{
                username: user.username,
                email: user.email,
                id: user._id
              },
            },
            process.env.ACCESS_TKN,  
            {expiresIn:"5m"}
        );
        res.status(200);
        console.log({acT});
        res.json({acT});
    }   
    else{
        res.status(401);
       throw new Error ("Invalid Email or Password");
    } 
});

const getcurr =asyncHandler((req,res)=>{
    res.json(req.login);
});


const getalluser = asyncHandler(async (req,res)=>{
    const search = req.query.search?{
        $or:[{
            name :{"$regex":req.query.search,"$options":"i"}
            },
            {
                email :{"$regex":req.query.search,"$options":"i"}
            }
    ]}
    :{};
    const users = await reg.find(search).find({_id:{$ne:req.login._id}})
    
    res.status(201).json(users);
})

module.exports  ={getcurr,postlogin,postreg,getalluser};