const mongoose  =  require("mongoose");
const regSchema = mongoose.Schema({

    username: {
        type:String,
        required:[true,"Username is Required"],
        unique: [true,'User already exists']
        
      },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique: [true,'email already exists']
     
        
      },
    password:{
        type:String,
        required:[true,"Password is Required"]
      },
     
}, { timestamps: true });
      module.exports=mongoose.model('reg',regSchema);
