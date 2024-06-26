const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

function addMiddlewares(router) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        const foundUsers = await User.getByUsername(username);
        if (foundUsers.length === 0) {
          return done("Error");
        }
        const isPasswordCorrect = await bcrypt.compare(
          password,
          foundUsers[0].password
        );
        if (isPasswordCorrect) {
          const user = {
            id: foundUsers[0].id,
            username: foundUsers[0].username
          };
          return done(null, user);
        }
        return done("err");
      }
    )
  );

  router.use(express.urlencoded({ extended: false })); // Form data

  router.use(express.json()); // JSON

  router.use(
    session({
      store: new MongoStore({
        url: "mongodb://localhost:27017/game",
        stringify: false
      }),
      cookie: {
        maxAge: 24 * 360000
      },
      secret: "you-losse-:D",
      resave: true,
      saveUninitialized: false
    })
  );

  router.use(passport.initialize());

  router.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log("serializeUser: user:", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser: id:", id);
    const user = await User.findById(id);
    done(null, user);
  });
}

module.exports = addMiddlewares;
