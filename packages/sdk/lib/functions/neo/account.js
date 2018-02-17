"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJwt = exports.createWallet = exports.processAuthentication = void 0;

var _neonJs = require("@cityofzion/neon-js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processAuthentication = function processAuthentication(key, password) {
  return new Promise(function (resolve, reject) {
    if (_neonJs.wallet.isNEP2(key)) {
      resolve(_neonJs.wallet.decrypt(key, password));
    } else if (_neonJs.wallet.isWIF(key)) {
      resolve(key);
    } else {
      reject('No valid NEP-2 or WIF entered.');
    }
  });
};

exports.processAuthentication = processAuthentication;

var createWallet = function createWallet(password) {
  var privateKey = _neonJs.wallet.generatePrivateKey();

  var WIF = new _neonJs.wallet.Account(privateKey).WIF;
  return {
    WIF: WIF,
    NEP2: _neonJs.wallet.encrypt(WIF, password)
  };
};

exports.createWallet = createWallet;

var generateJwt = function generateJwt(userObject, secret, expirationTime) {
  _jsonwebtoken.default.sign({
    data: userObject
  }, secret, {
    expiresIn: expirationTime
  });
};

exports.generateJwt = generateJwt;