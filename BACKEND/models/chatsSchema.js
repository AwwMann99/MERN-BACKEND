const mongoose = require("mongoose");
const Chat = mongoose.Schema({
    Chatname:{
        type:String,
        trim: true

    },
    isGC:{
        type:Boolean,
        default:false,

    },
    lastmsg:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reg"
    }],
    Admingrup:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reg"

    },
}, { timestamps: true }
);

module.exports= mongoose.model("Chat",Chat);