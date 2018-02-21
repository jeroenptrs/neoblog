"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeJwt = exports.generateJwt = exports.createAccount = exports.processAuthentication = void 0;

var _neonJs = _interopRequireWildcard(require("@cityofzion/neon-js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _neo = require("./../../helpers/neo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var processAuthentication = function processAuthentication(key, password) {
  var determination = (0, _neo.determineKey)(key);
  if (determination === "NEP2") return _neonJs.wallet.decrypt(key, password);
  if (determination) return key;
  return determination;
};

exports.processAuthentication = processAuthentication;

var createAccount = function createAccount(WIF) {
  if (_neonJs.wallet.isWIF(WIF)) return _neonJs.default.create.account(WIF);
  return WIF;
};

exports.createAccount = createAccount;

var generateJwt = function generateJwt(account, secret) {
  return _jsonwebtoken.default.sign(account, secret);
};

exports.generateJwt = generateJwt;

var decodeJwt = function decodeJwt(token) {
  return _jsonwebtoken.default.decode(token);
};

exports.decodeJwt = decodeJwt;