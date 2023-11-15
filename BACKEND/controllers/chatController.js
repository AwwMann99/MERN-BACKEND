const Chat = require("../models/chatsSchema");
const asyncHandler = require("express-async-handler");
const reg = require("../models/regSchema");
const createChat = asyncHandler(async (req, res) => {
    const { userid } = req.body;
  
    if (!userid) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.login._id } } },
        { users: { $elemMatch: { $eq: userid } } },
      ],
    })
      .populate("users", "-password")
      .populate("lastmsg");
  
    isChat = await reg.populate(isChat, {
      path: "lastmsg.sender",
      select: "username pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        Chatname: "sender",
        isGC: false,
        users: [req.login._id, userid],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        
        );
        
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  });
const fetchChat = asyncHandler(async(req,res)=>{
    try{
        Chat.find({users:{$elemMatch:{$eq:req.login._id}}})
        .populate("users","-password")
        .populate("Admingrup","-password")
        .populate("lastmsg")
        .sort({updatedAt:-1})
        .then(async(results)=>{
          console.log("Chats with populated lastmsg:", results);
            results =await reg.populate(results, {
                path: "lastmsg.sender",
                select: "username email",
              });
              res.status(200).send(results);
           

        })
    }catch(err)
    {
        res.status(400)
        throw new Error(err.message)
    }
})
module.exports={createChat,fetchChat};