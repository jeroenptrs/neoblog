"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWallet = exports.processAuthentication = void 0;

var _neonJs = require("@cityofzion/neon-js");

var processAuthentication = function processAuthentication(key, password) {
  if (_neonJs.wallet.isNEP2(key)) {
    return _neonJs.wallet.decrypt(key, password);
  } else if (_neonJs.wallet.isWIF(key)) {
    return key;
  } else {
    throw new Error('No valid NEP-2 or WIF entered.');
  }
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