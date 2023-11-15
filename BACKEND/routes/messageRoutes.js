const express = require("express");
const validToken = require("../middleware/validToken");
const router = express.Router();
const {sendmsgs,allmsgs} = require("../controllers/messageController")

router.route("/").post(validToken,sendmsgs);
router.route("/:chatid").get(validToken,allmsgs);

module.exports = router;