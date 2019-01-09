const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const url = require('url');
const qs = require('qs');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const buildSignature = (data, config) => (
  crypto.createHmac('sha256', config.API_SECRET).update(data).digest('hex')
);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/public/*', (req, res) => {
  const myURL = url.parse(req.url);
  const baseUrl = 'https://api.binance.com';
  const pathname = myURL.pathname.split('/public').pop();

  axios.get(baseUrl + pathname, {
    params: req.query,
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.end();
    });
});

app.get('/private/*', (req, res) => {
  const myURL = url.parse(req.url);
  const pathname = myURL.pathname.split('/private').pop();
  const params = req.query;
  const baseUrl = 'https://api.binance.com';

  const binanceConfig = {
    API_KEY: params.key,
    API_SECRET: params.secret,
    HOST_URL: baseUrl,
  };

  const timestamp = new Date().getTime();

  delete params.key;
  delete params.secret;

  params.timestamp = timestamp;

  const queryString = qs.stringify(params);
  const signature = buildSignature(queryString, binanceConfig);

  params.signature = signature;

  axios.get(baseUrl + pathname, {
    params,
    headers: {
      'X-MBX-APIKEY': binanceConfig.API_KEY,
    },
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.end();
    });
});

app.get('/market/*', (req, res) => {
  const myURL = url.parse(req.url);
  const pathname = myURL.pathname.split('/market').pop();
  const params = req.query;
  const baseUrl = 'https://pro-api.coinmarketcap.com';
  const { hash } = params;

  delete params.hash;

  axios.get(baseUrl + pathname, {
    params,
    headers: {
      'X-CMC_PRO_API_KEY': hash,
    },
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.end();
    });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
