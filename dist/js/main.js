/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/main.js */ \"./src/js/main.js\");\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/env/env.js":
/*!************************!*\
  !*** ./src/env/env.js ***!
  \************************/
/*! exports provided: env */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"env\", function() { return env; });\nconst env = {\r\n  dev: true,\r\n  prod: false,\r\n  api: 'http://localhost:3000'\r\n}\r\n\n\n//# sourceURL=webpack:///./src/env/env.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _env_env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/env.js */ \"./src/env/env.js\");\n\r\n\r\nconst getCookies = (key, secret, hash) => {\r\n  const cookies = document.cookie;\r\n  const cookiesObj = {};\r\n\r\n  if (cookies) {\r\n    cookies.split(';').forEach(item => {\r\n      const cookie = item.split('=');\r\n\r\n      cookiesObj[cookie[0].trim()] = cookie[1].trim();\r\n    });\r\n\r\n    key.value = cookiesObj.key ? cookiesObj.key : null;\r\n    secret.value = cookiesObj.secret ? cookiesObj.secret : null;\r\n    hash.value = cookiesObj.hash ? cookiesObj.hash : null;\r\n  }\r\n}\r\n\r\nconst padRight = (number, size) => {\r\n  return parseFloat(number).toFixed(size);\r\n}\r\n\r\nconst currencyFormat = (value, style, currency) => {\r\n  return value.toLocaleString(style, {style: 'currency', currency: currency});\r\n}\r\n\r\nconst convertSymbol = (symbol) => {\r\n  switch (symbol) {\r\n    case 'BCHSV':\r\n      return 'BSV';\r\n\r\n    case 'BCHABC':\r\n      return 'BCH';\r\n\r\n    case 'IOTA':\r\n      return 'MIOTA';\r\n\r\n    default:\r\n      return symbol;\r\n  }\r\n}\r\n\r\nconst key = document.querySelector('#key');\r\nconst secret = document.querySelector('#secret');\r\nconst hash = document.querySelector('#hash');\r\nconst btnUpdate = document.querySelector('#btn-update');\r\nconst tBody = document.querySelector('table > tbody');\r\n\r\ngetCookies(key, secret, hash);\r\n\r\nlet accountData;\r\nlet funds;\r\nlet fundsCalc = [];\r\nlet BRLPrices;\r\n\r\nbtnUpdate.addEventListener('click', () => {\r\n  document.cookie = `key=${key.value};samesite=strict;max-age=604800`;\r\n  document.cookie = `secret=${secret.value};samesite=strict;max-age=604800`;\r\n  document.cookie = `hash=${hash.value};samesite=strict;max-age=604800`;\r\n\r\n  fundsCalc = [];\r\n  tBody.innerHTML = '<td colspan=\"6\" align=\"center\">Loading...</td>';\r\n\r\n  fetch(`${_env_env_js__WEBPACK_IMPORTED_MODULE_0__[\"env\"].api}/private/api/v3/account?key=${key.value}&secret=${secret.value}`).then((response) => {\r\n    return response.json();\r\n  }).then((data) => {\r\n\r\n    accountData = data;\r\n    funds = accountData.balances.filter(e => parseFloat(e.free) + parseFloat(e.locked) > 0 && e.asset !== 'BTC');\r\n\r\n    funds.reduce((promise, item, index) => {\r\n      return promise.then(() => new Promise((resolve, reject) => {\r\n        const symbol = item.asset + 'BTC';\r\n        let averagePrice;\r\n        let price;\r\n\r\n        fetch(`${_env_env_js__WEBPACK_IMPORTED_MODULE_0__[\"env\"].api}/private/api/v3/allOrders?symbol=${symbol}&key=${key.value}&secret=${secret.value}`).then((response) => {\r\n          return response.json();\r\n        }).then((data) => {\r\n\r\n          let totalPrice = 0;\r\n          let removeFromLength = 0;\r\n\r\n          data.forEach(item => {\r\n            if (item.side === 'BUY' && item.status === 'FILLED') {\r\n              totalPrice += parseFloat(item.cummulativeQuoteQty) / parseFloat(item.executedQty);\r\n            } else {\r\n              removeFromLength++;\r\n            }\r\n          });\r\n\r\n          averagePrice = totalPrice / (data.length - removeFromLength);\r\n\r\n          fetch(`${_env_env_js__WEBPACK_IMPORTED_MODULE_0__[\"env\"].api}/public/api/v1/ticker/price?symbol=${symbol}`).then((response) => {\r\n            return response.json();\r\n          }).then((data) => {\r\n\r\n            price = data.price;\r\n\r\n            fundsCalc.push({\r\n              coin: item.asset,\r\n              qtd: parseFloat(item.free) + parseFloat(item.locked),\r\n              averagePrice: averagePrice,\r\n              price: price\r\n            });\r\n\r\n            resolve();\r\n          }).catch((error) => {\r\n            console.log(error);\r\n            reject();\r\n          });\r\n        }).catch((error) => {\r\n          console.log(error);\r\n          reject();\r\n        });\r\n      })\r\n    )}, Promise.resolve()).then(() => {\r\n\r\n      const symbols = fundsCalc.map(e => convertSymbol(e.coin)).join(',');\r\n\r\n      fetch(`${_env_env_js__WEBPACK_IMPORTED_MODULE_0__[\"env\"].api}/market/v1/cryptocurrency/quotes/latest?symbol=${symbols}&convert=BRL&hash=${hash.value}`).then(response => {\r\n        return response.json();\r\n      }).then(response => {\r\n        BRLPrices = response;\r\n\r\n        for (const coin in BRLPrices.data) {\r\n          const index = fundsCalc.map(e => convertSymbol(e.coin)).indexOf(coin);\r\n\r\n          if (index > -1) {\r\n            fundsCalc[index]['BRLPrice'] = BRLPrices.data[coin].quote['BRL'].price;\r\n          }\r\n        }\r\n      }).then(() => {\r\n\r\n        let totalFoundsInBRL = 0;\r\n        let totalFoundsInBTC = 0;\r\n        let tableRow = '';\r\n\r\n        fundsCalc.forEach(item => {\r\n          const percentage = ((100 / parseFloat(item.averagePrice) * parseFloat(item.price)) - 100).toFixed(2);\r\n          const totalInBRL = parseFloat(item.qtd) * parseFloat(item.BRLPrice);\r\n\r\n          totalFoundsInBTC += parseFloat(item.qtd) * parseFloat(item.price);\r\n          totalFoundsInBRL += totalInBRL;\r\n\r\n          tableRow += `<tr>\r\n                          <td align=\"left\">${item.coin}</td>\r\n                          <td align=\"right\">${item.qtd}</td>\r\n                          <td align=\"right\">${padRight(item.averagePrice, 8)}</td>\r\n                          <td align=\"right\">${item.price}</td>\r\n                          <td align=\"right\">${currencyFormat(totalInBRL, 'pt-br', 'BRL')}</td>\r\n                          <td align=\"right\" class=\"${percentage >= 0 ? 'p' : 'n'}\">${percentage}</td>\r\n                        </tr>`;\r\n        });\r\n\r\n        tBody.innerHTML = tableRow;\r\n        document.querySelector('#btc').innerText = `BTC: ${totalFoundsInBTC.toFixed(8)}`;\r\n        document.querySelector('#brl').innerText = `BRL: ${currencyFormat(totalFoundsInBRL, 'pt-br', 'BRL')}`;\r\n\r\n      }).catch(error => {\r\n        console.log(error);\r\n      });\r\n    });\r\n\r\n  }).catch((error) => {\r\n    console.log(error);\r\n\r\n    tBody.innerHTML = '<td colspan=\"6\" align=\"center\">Error on loading.</td>';\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"css/main.css\";\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/app.js ./src/scss/main.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/app.js */\"./src/app.js\");\nmodule.exports = __webpack_require__(/*! ./src/scss/main.scss */\"./src/scss/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/app.js_./src/scss/main.scss?");

/***/ })

/******/ });