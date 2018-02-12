"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.param = exports.scriptHashToAddress = void 0;

var _bs = _interopRequireDefault(require("bs58"));

var _neonJs = require("@cityofzion/neon-js");

var _config = require("./../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Module imports
var hash256 = _neonJs.u.hash256; // Config

/**
 * Converts a script hash, returned from the Neoblog smart contract, to an address
 * @param {string} scriptHash Hash to convert
 * @returns {string} converted address
 */
var scriptHashToAddress = function scriptHashToAddress(scriptHash) {
  var shaChecksum = hash256(_config.ADDR_VERSION + scriptHash).substr(0, 8);
  return _bs.default.encode(Buffer.from(_config.ADDR_VERSION + scriptHash + shaChecksum, "hex"));
};

exports.scriptHashToAddress = scriptHashToAddress;
var param = {
  string: function string(c) {
    return _neonJs.sc.ContractParam.string(c);
  }
};
exports.param = param;