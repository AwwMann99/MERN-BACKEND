const express = require("express")
const app =express();
const dotenv = require("dotenv").config();
const errorHandler =require("./middleware/errorhandler");
const connectDB = require("./config/mongodbconnection");
connectDB();
port = process.env.PORT || 4000
app.use(express.json());
app.use("/api/users",require("./routes/regRoutes"));
app.use("/api/chat",require("./routes/chatroutes"));
app.use("/api/message",require("./routes/messageRoutes"));
app.use(errorHandler);
const ser = app.listen(port, ()=>{
    console.log("listening at "+port);
});

const io = require("socket.io")(ser,{
    pingTimeout:60000,
    cors: {origin:"http://localhost:4005",
},

})
io.on("connection",(socket)=>{
    console.log("connected to socket.io");
})



