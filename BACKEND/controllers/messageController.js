const asyncHandler =  require("express-async-handler");
const Message = require("../models/messageSchema");
const reg = require("../models/regSchema");
const Chat= require("../models/chatsSchema");
const sendmsgs = asyncHandler(async(req,res)=>{
const {content,chatid}= req.body;
if(!chatid||!content) {
    res.status(400)
    throw new Error("Invalid: no date sent");

    
}
var newMsg={
    sender: req.login._id,
    content: content,
    chat:chatid
}
try {
    var message = await Message.create(newMsg);
    message = await message.populate("sender","name pic");
    message = await message.populate("chat");
    message = await reg.populate(message,{
        path:"Chat.users",
        select:"username  email"
    });
    await Chat.findByIdAndUpdate(req.body.chatid,{lastmsg:message,});
    res.json({message});
} catch (error) {
    res.status(400);
    throw new Error(error.message)
    
}
});
const allmsgs = asyncHandler(async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatid })
        .populate("sender", "username email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
module.exports={sendmsgs,allmsgs};