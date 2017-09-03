function init (app, dbPool, db) {
  const passport = require('passport');
  const User = require('mongoose').model('User');

  function isUser(userToFind, callback) {
    User.findOne( userToFind, "username")
    .lean()
    .exec( function (err, user) {
      if (err) { return callback(err, null); }
      if (!user || user == null) { return callback(false, false); }
      return callback(false, true);
    });
  }

  function findUser(userToFind, fields, callback) {
    User.findOne( userToFind, fields)
    .lean()
    .exec( function (err, user) {
      if (err) { return callback(err); }
      if (!user || user == null) { return callback(false, false); }
      return callback(false, user);
    })
  }

  function getUsers (req, res) {
    console.log("GET /users");
    findUser(req.user, "username password tasks dayStartHour dayStartMin", function (err, user) {
      if (err || !user) { res.sendStatus(500); }
      else { res.status(200).json(user); }
    });
  };

  function postUsers (req, res) {
    console.log("POST /users");
    isUser({
      username: req.body.username
    }, function (err, existUser) {
      if (err) { res.sendStatus(500); }
      else if (existUser) { res.sendStatus(400); }
      else {
        new User({
          username: req.body.username,
          password: req.body.password
        }).save(function (err, userSaved) {
          if (err) { res.sendStatus(500); }
          else if (!userSaved) { res.sendStatus(404); }
          else { res.sendStatus(200); }
        });
      }
    });
  };

  function getUsersUsername (req, res) {
    console.log("GET /users/" + req.params.username);
    isUser({
      username: req.params.username
    }, function (err, existUser){
      if (err) { res.sendStatus(500); }
      else if (!existUser) { res.sendStatus(404); }
      else { res.sendStatus(200); }
    })
  };

  app.get('/api/users', passport.authMiddleware(), getUsers);
  // app.get('/api/users', getUsers);
  app.get('/api/users/:username',  getUsersUsername);
  app.post('/api/users', postUsers);
};

module.exports = init;
