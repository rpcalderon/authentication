const express = require('express'),
      bodyParser = require('body-parser'),
      port = 3000;

const app = express(),
      router = express.Router();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get('/', (req, res, next) => {
  res.send('hi!');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})