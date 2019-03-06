const express = require('express'),
      bodyParser = require('body-parser'),
      routes = require('./routes/index.js'),
      port = 3000;

const app = express(),
      router = express.Router();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use('/api', routes(router));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})