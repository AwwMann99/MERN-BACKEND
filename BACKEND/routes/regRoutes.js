const express = require("express");
const routerreg= express.Router();
const {getcurr,postlogin,postreg, getalluser} = require("../controllers/regController")
const validToken = require("../middleware/validToken")
routerreg.route("/").get(validToken,getalluser);
routerreg.route("/register").post(postreg);
routerreg.route("/login").post(postlogin);
routerreg.route("/current").get(validToken,getcurr);

module.exports  = routerreg;