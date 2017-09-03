const db = {}

db.conf = {
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'easylist',
  password        : 'easylistpwd',
  database        : 'easylistdb'
};

db.users = {};
db.users.selectByUsernameAndPassword = "select username from users where username = ? and password = ?;";
db.users.selectByUsername = "select username from users where username = ?;";
db.users.insert = "insert into users (username, password) values (?, ?);";

module.exports = db;
