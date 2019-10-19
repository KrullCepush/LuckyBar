function authenticationMiddleware() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  };
}

function notAuthenticationMiddleware() {
  return function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  };
}

module.exports = {
  authenticationMiddleware,
  notAuthenticationMiddleware
};
