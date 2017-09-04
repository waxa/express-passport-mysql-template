function init (app) {
  const passport = require('passport');

  function getLogin(req, res) {
    console.log("GET /login");
    res.sendStatus(201);
  };

  function postLogin(req, res) {
    console.log("POST /login");
    res.sendStatus(201);
  };

  function deleteLogin(req, res) {
    console.log("DELETE /login");
    req.logout();
    res.sendStatus(201);
  }

  app.get('/api/login', passport.authMiddleware(), getLogin);
  app.post('/api/login', passport.authenticate('local'), postLogin);
  app.delete('/api/login', deleteLogin);
};

module.exports = init;
