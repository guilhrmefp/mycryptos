const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const url = require('url');
const fs = require('fs');
const path = require('path');
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

app.get('/*', (req, res, next) => {
  const reqURL = url.parse(req.url);

  const routes = ['public', 'private', 'market'];

  if (reqURL.pathname === '/') {
    res.sendFile('dist/index.html', { root: __dirname });
  } else if (routes.some(e => reqURL.pathname.indexOf(e) > -1)) {
    next();
  } else {
    req.url = `/static/dist${req.url}`;
    next();
  }
});

app.get('/static/*', (req, res) => {
  console.log(`${req.method} ${req.url}`);

  const fileUrl = req.url.split('/static').pop();

  // parse URL
  const parsedUrl = url.parse(fileUrl);

  console.log(parsedUrl);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const { ext } = path.parse(pathname);
  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
  };

  fs.exists(pathname, (exist) => {
    if (!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) pathname += `/index${ext}`;

    // read file from file system
    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain');
        res.end(data);
      }
    });
  });
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
      res.status(error.response.status).json(error.response.data);
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

  // params.timestamp = timestamp;

  const getData = async function () {
    const time = await axios.get(baseUrl + '/api/v3/time');
    const { serverTime } = time.data;

    params.timestamp = serverTime;
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
        res.status(error.response.status).json(error.response.data);
      });
  }

  getData();
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
