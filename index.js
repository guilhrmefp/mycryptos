const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const axios = require('axios');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/binance', function (req, res) {
  console.log(req, res)

  axios.get('https://api.binance.com/api/v1/trades?symbol=POLYBTC&limit=1')
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
