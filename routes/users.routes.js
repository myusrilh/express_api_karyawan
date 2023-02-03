const express = require('express');
const router = express.Router();
const user = require("../models/user.model.js");

router.post("/login", user.getUserByUsernameAndPassword);

module.exports = router;