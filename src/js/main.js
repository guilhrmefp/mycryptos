const apiUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

const getCookies = (key, secret, hash) => {
  const cookies = document.cookie;
  const cookiesObj = {};

  const inputKey = key;
  const inputSecret = secret;
  const inputHash = hash;

  if (cookies) {
    cookies.split(';').forEach((item) => {
      const cookie = item.split('=');

      cookiesObj[cookie[0].trim()] = cookie[1].trim();
    });

    inputKey.value = cookiesObj.key ? cookiesObj.key : null;
    inputSecret.value = cookiesObj.secret ? cookiesObj.secret : null;
    inputHash.value = cookiesObj.hash ? cookiesObj.hash : null;
  }
};

const padRight = (number, size) => (
  parseFloat(number).toFixed(size)
);

const currencyFormat = (value, style, currency) => (
  value.toLocaleString(style, { style: 'currency', currency })
);

const convertSymbol = (symbol) => {
  switch (symbol) {
    case 'BCHSV':
      return 'BSV';

    case 'BCHABC':
      return 'BCH';

    case 'IOTA':
      return 'MIOTA';

    default:
      return symbol;
  }
};

const key = document.querySelector('#key');
const secret = document.querySelector('#secret');
const hash = document.querySelector('#hash');
const btnUpdate = document.querySelector('#btn-update');
const tBody = document.querySelector('table > tbody');

getCookies(key, secret, hash);

let accountData;
let funds;
let fundsCalc = [];
let BRLPrices;

btnUpdate.addEventListener('click', () => {
  document.cookie = `key=${key.value};samesite=strict;max-age=604800`;
  document.cookie = `secret=${secret.value};samesite=strict;max-age=604800`;
  document.cookie = `hash=${hash.value};samesite=strict;max-age=604800`;

  fundsCalc = [];
  tBody.innerHTML = '<td colspan="6" align="center">Loading...</td>';

  fetch(`${apiUrl}/private/api/v3/account?key=${key.value}&secret=${secret.value}`)
    .then(response => response.json())
    .then((response) => {
      accountData = response;
      funds = accountData.balances.filter(e => parseFloat(e.free) + parseFloat(e.locked) > 0 && e.asset !== 'BTC');

      funds.reduce((promise, item) => (
        promise.then(() => new Promise((resolve, reject) => {
          const symbol = `${item.asset}BTC`;

          let averagePrice;
          let price;

          fetch(`${apiUrl}/private/api/v3/allOrders?symbol=${symbol}&key=${key.value}&secret=${secret.value}`).then(symbolOrders => symbolOrders.json()).then((symbolOrders) => {
            const data = symbolOrders;

            let totalPrice = 0;
            let removeFromLength = 0;

            data.forEach((order) => {
              if (order.side === 'BUY' && order.status === 'FILLED') {
                totalPrice += parseFloat(order.cummulativeQuoteQty) / parseFloat(order.executedQty);
              } else {
                removeFromLength += 1;
              }
            });

            averagePrice = totalPrice / (data.length - removeFromLength);

            fetch(`${apiUrl}/public/api/v1/ticker/price?symbol=${symbol}`).then(symbolPrice => symbolPrice.json()).then((symbolPrice) => {
              const ticker = symbolPrice;

              // object destructuring
              ({ price } = ticker);

              fundsCalc.push({
                coin: item.asset,
                qtd: parseFloat(item.free) + parseFloat(item.locked),
                averagePrice,
                price,
              });

              resolve();
            }).catch((error) => {
              console.log(error);
              reject();
            });
          }).catch((error) => {
            console.log(error);
            reject();
          });
        }))
      ), Promise.resolve()).then(() => {
        const symbols = fundsCalc.map(e => convertSymbol(e.coin)).join(',');

        fetch(`${apiUrl}/market/v1/cryptocurrency/quotes/latest?symbol=${symbols}&convert=BRL&hash=${hash.value}`).then(symbolsPriceInBRL => symbolsPriceInBRL.json()).then((symbolsPriceInBRL) => {
          BRLPrices = symbolsPriceInBRL;

          const BRLPricesSymbols = Object.keys(BRLPrices.data);

          BRLPricesSymbols.forEach((symbol) => {
            const index = fundsCalc.map(e => convertSymbol(e.coin)).indexOf(symbol);

            if (index > -1) {
              fundsCalc[index].BRLPrice = BRLPrices.data[symbol].quote.BRL.price;
            }
          });
        }).then(() => {
          let totalFoundsInBRL = 0;
          let totalFoundsInBTC = 0;
          let tableRow = '';

          fundsCalc.forEach((item) => {
            const percentage = (100 / parseFloat(item.averagePrice) * parseFloat(item.price)) - 100;
            const totalInBRL = parseFloat(item.qtd) * parseFloat(item.BRLPrice);

            totalFoundsInBTC += parseFloat(item.qtd) * parseFloat(item.price);
            totalFoundsInBRL += totalInBRL;

            tableRow += `<tr>
                            <td align="left">${item.coin}</td>
                            <td align="right">${item.qtd}</td>
                            <td align="right">${padRight(item.averagePrice, 8)}</td>
                            <td align="right">${item.price}</td>
                            <td align="right">${currencyFormat(totalInBRL, 'pt-br', 'BRL')}</td>
                            <td align="right" class="${percentage >= 0 ? 'p' : 'n'}">${padRight(percentage, 2)}</td>
                          </tr>`;
          });

          tBody.innerHTML = tableRow;
          document.querySelector('#btc').innerText = `BTC: ${totalFoundsInBTC.toFixed(8)}`;
          document.querySelector('#brl').innerText = `BRL: ${currencyFormat(totalFoundsInBRL, 'pt-br', 'BRL')}`;
        })
          .catch((error) => {
            console.log(error);
          });
      });
    }).catch((error) => {
      console.log(error);

      tBody.innerHTML = '<td colspan="6" align="center">Error on loading.</td>';
    });
});
