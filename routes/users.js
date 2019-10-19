const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const passport = require("passport");
const addMiddlewares = require("../middleware/passportConfig");

const {
  authenticationMiddleware,
  notAuthenticationMiddleware
} = require("../middleware/authHelpers");

/* GET users listing. */
addMiddlewares(router);
router
  .route("/login")
  .get(notAuthenticationMiddleware(), (req, res) => {
    console.log(req.user);
    res.render("login");
  })
  .post(notAuthenticationMiddleware(), (req, res, next) => {
    console.log(req.body);
    passport.authenticate("local", (err, user) => {
      if (err) {
        return res.render("login", {
          err: "Неправильное имя пользователя или пароль"
        });
      }
      req.logIn(user, err => {
        if (err) {
          return res.render("login", {
            err: "Неправильное имя пользователя или пароль"
          });
        }
        return res.redirect("/");
      });
    })(req, res, next);
  });

router
  .route("/registration")
  .get(notAuthenticationMiddleware(), (req, res) => {
    res.render("registration");
  })
  .post(notAuthenticationMiddleware(), async (req, res) => {
    const checkLogin = await User.findOne({ username: req.body.username });
    if (checkLogin === null) {
      const password = await bcrypt.hash(req.body.password, 10);
      await User.create({
        username: req.body.username,
        password: password
      });
      res.redirect("/users/login");
    } else {
      res.render("registration", { err: "Имя занято" });
    }
  });

router.get("/logout", authenticationMiddleware(), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
