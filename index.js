const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const axios = require('axios');
const url = require('url');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname })
});

app.get('/binance/*', function (req, res) {
  // const myURL = new URL(req.url);
  const myURL = url.parse(req.url);
  const baseUrl = 'https://api.binance.com';
  const pathname = myURL.pathname.split('/binance').pop();

  axios.get(baseUrl + pathname, {
    params: req.query
  })
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`)
})
