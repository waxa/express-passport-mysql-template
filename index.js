const app = require('./app');
const port = 27042;

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log(`server is listening on ${port}...`)
});
