function init (app, dbPool, dbquerys) {
  const passport = require('passport');

  function getUsers (req, res) {
    console.log("GET /users");
    dbPool.getConnection( function (err, connection) {
      if (err) {
        res.sendStatus(500);
      } else {
        connection.query(dbquerys.users.selectAll, function (error, results, fields) {
          connection.release();
          if (error) {
            res.sendStatus(500);
          } else if (results.length == 0) {
            res.status(200).json([]);
          } else {
            var users = [];
            for (var i = 0; i < results.length; i++) {
              var aux = {};
              aux.username = results[i].username;
              aux.password = results[i].password;
              users.push(aux);
            }
            res.status(200).json(users);
          }
        })
      }
    });
  };

  function postUsers (req, res) {
    console.log("POST /users");
    dbPool.getConnection( function (err, connection) {
      if (err) {
        res.sendStatus(500);
      } else {
        connection.query(
          dbquerys.users.insert,
          [req.body.username, req.body.password],
          function (error, results, fields) {
            connection.release();
            if (error) {
              res.sendStatus(400);
            } else {
              res.sendStatus(201);
            }
          }
        )
      }
    });
  };

  function getUsersByUsername (req, res) {
    console.log("GET /users/" + req.params.username);
    dbPool.getConnection( function (err, connection) {
      if (err) {
        res.sendStatus(500);
      } else {
        connection.query(dbquerys.users.selectByUsername, [req.params.username],
          function (error, results, fields) {
            connection.release();
            if (error) {
              res.sendStatus(500);
            } else if (results.length != 1) {
              res.sendStatus(400);
            } else {
              var user = {};
              user.username = results[0].username;
              user.password = results[0].password;
            }
            res.status(200).json(user);
          }
        );
      }
    });
  };

  app.get('/api/users', passport.authMiddleware(), getUsers);
  app.get('/api/users/:username', passport.authMiddleware(), getUsersByUsername);
  app.post('/api/users', postUsers);
};

module.exports = init;
