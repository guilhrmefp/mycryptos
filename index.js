const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const axios = require('axios');
const url = require('url');
const qs = require('qs');
const crypto = require('crypto');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const buildSignature = (data, config) => {
  return crypto.createHmac('sha256', config.API_SECRET).update(data).digest('hex');
};

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname })
});

app.get('/public/*', function (req, res) {
  // const myURL = new URL(req.url);
  const myURL = url.parse(req.url);
  const baseUrl = 'https://api.binance.com';
  const pathname = myURL.pathname.split('/public').pop();

  axios.get(baseUrl + pathname, {
    params: req.query
  })
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.end();
  });
});

app.get('/private/*', function (req, res) {
  // const myURL = new URL(req.url);
  const myURL = url.parse(req.url);
  const baseUrl = 'https://api.binance.com';
  const pathname = myURL.pathname.split('/private').pop();

  const binanceConfig = {
    API_KEY: req.query.key,
    API_SECRET: req.query.secret,
    HOST_URL: baseUrl,
  };

  const timestamp = new Date().getTime();

  const queryString = qs.stringify({timestamp: timestamp});
  const signature = buildSignature(queryString, binanceConfig);

  axios.get(baseUrl + pathname, {
    params: {
      timestamp: timestamp,
      signature: signature
    },
    headers: {
      'X-MBX-APIKEY': binanceConfig.API_KEY
    }
  })
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.end();
  });
});

app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`)
});
