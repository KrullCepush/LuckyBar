const express = require("express");
const router = express.Router();

const passport = require("passport");
const addMiddlewares = require("../middleware/passportConfig");
addMiddlewares(router);

const {
  authenticationMiddleware,
  notAuthenticationMiddleware
} = require("../middleware/authHelpers");

const { getUserNickname } = require("../middleware/reqHelpers");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    user: getUserNickname(req)
  });
});

module.exports = router;
