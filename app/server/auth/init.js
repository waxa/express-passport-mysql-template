const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authMiddleware = require('./auth-middleware');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


// function findUser (userToFind, fields, callback) {
//   User.findOne( userToFind, fields )
//   .lean().exec( function (err, user) {
//     if (err) { return callback(err); }
//     if (!user) { return callback(null); }
//     return callback(null, user);
//   });
// };

function findUser (username, mysqlPool, dbquerys, callback) {
  console.log("en finduser");
  mysqlPool.query(dbquerys.users.selectByUsername, [username], function (error, results, fields) {
    if (error) {
      return callback(error);
    }
    if (results.length != 1) {
      return callback(null);
    }
    var user = {};
    user.username = results[0].username;
    console.log('user: ', user);
    return callback(null, user);
  });
};

function initPassport (app, dbPool, db) {
  var store = new MySQLStore(db.conf, dbPool);

  // Catch errors
  store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

  app.use(session({
      key: 'session_cookie_name',
      secret: 'session_cookie_secret',
      store: store,
      resave: true,
      saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(function (username, callback) {
    dbPool.query(db.users.selectByUsername, [username], function (error, results, fields) {
      if (error) {
        return callback(error);
      }
      if (results.length != 1) {
        return callback(null);
      }
      var user = {};
      user.username = results[0].username;
      console.log('user: ', user);
      return callback(null, user);
    });
  });

  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      dbPool.query(
        db.users.selectByUsernameAndPassword, [username, password],
        function (error, results, fields) {
          if (error) {
            return done(error);
          }
          if (results.length != 1) {
            return done(null, false);
          }
          var user = {};
          user.username = results[0].username;
          console.log('user: ', user);
          return done(null, user);
        }
      );
    }
  ));

  passport.authMiddleware = authMiddleware;
};

module.exports = initPassport;
