const express = require("express");
const validToken = require("../middleware/validToken");
const {createChat,fetchChat} = require("../controllers/chatController")

const routes = express.Router();

routes.route("/").post(validToken,createChat);
routes.route("/").get(validToken,fetchChat);

module.exports=routes;