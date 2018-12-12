const http = require('http');
const axios = require('axios');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end('Hello Node.JS!');


  axios.get('https://api.binance.com/api/v1/trades?symbol=POLYBTC&limit=1')
  .then(function (response) {
            res.end(JSON.stringify(response.data));
  })
  .catch(function (error) {
      console.log(error);
  });

}).listen(8080);

console.log('Server running at http://localhost:8080/');
