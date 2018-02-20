"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.param = exports.hexToTimestamp = exports.unhex = exports.scriptHashToAddress = exports.deserialize = void 0;

var _bs = _interopRequireDefault(require("bs58"));

var _neonJs = require("@cityofzion/neon-js");

var _binascii = require("binascii");

var moment = _interopRequireWildcard(require("moment"));

var _config = require("./../config");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Module imports
var hash256 = _neonJs.u.hash256; // Config

/**
 * Deserializes a serialized array that's passed as a hexstring
 * @param {hexstring} rawData
 */
var deserialize = function deserialize(rawData) {
  // Split into bytes of 2 characters
  var rawSplitted = rawData.match(/.{2}/g); // The size of the length of your array.
  // It's in hex so the length is max 255.

  var collectionLenLen = parseInt(rawSplitted[0], 16);
  var offset = collectionLenLen + 1; // offset is malleable
  // Get the amount of elements in your array.

  var collectionLen = parseInt(concatBytes(rawSplitted, 1, offset), 16);
  var rawArray = [];

  for (var i = 0; i < collectionLen; i += 1) {
    var incOffset = offset + 1; // The size of the length of your item.
    // It's in hex so the length is max 255.

    var itemLenLen = parseInt(concatBytes(rawSplitted, offset, incOffset), 16);
    var offsetItemLenLen = incOffset + itemLenLen; // Get the length of your item

    var itemLen = parseInt(concatBytes(rawSplitted, incOffset, offsetItemLenLen), 16);
    var offsetItemLen = offsetItemLenLen + itemLen; // Store to rawArray

    rawArray.push(concatBytes(rawSplitted, offsetItemLenLen, offsetItemLen)); // Abuse malleable offset

    offset = offsetItemLen;
  }

  return rawArray;
};
/**
 * Returns a concatted string of bytes from source, from start
 * @param {array} source
 * @param {int} start
 * @param {int} length
 */


exports.deserialize = deserialize;

var concatBytes = function concatBytes(source, start, length) {
  var temp = "";

  for (var i = start; i < length; i += 1) {
    temp += source[i];
  }

  return temp;
};
/**
 * Converts a script hash, returned from the Neoblog smart contract, to an address
 * @param {string} scriptHash Hash to convert
 * @returns {string} converted address
 */


var scriptHashToAddress = function scriptHashToAddress(scriptHash) {
  var shaChecksum = hash256(_config.ADDR_VERSION + scriptHash).substr(0, 8);
  return _bs.default.encode(Buffer.from(_config.ADDR_VERSION + scriptHash + shaChecksum, "hex"));
};
/**
 * Extends unhexlify
 * @param {hexstring} param
 */


exports.scriptHashToAddress = scriptHashToAddress;

var unhex = function unhex(param) {
  return (0, _binascii.unhexlify)(param);
};
/**
 * Converts Neoblog data to a formatted Timestamp
 * @param {hexstring} raw
 */


exports.unhex = unhex;

var hexToTimestamp = function hexToTimestamp(raw) {
  var unformatted = moment.unix(parseInt(_neonJs.u.reverseHex(raw), 16));
  return unformatted.format("MMMM Do YYYY, HH:mm");
};

exports.hexToTimestamp = hexToTimestamp;
var param = {
  string: function string(c) {
    return _neonJs.sc.ContractParam.string(c);
  },
  array: function array(c) {
    return _neonJs.sc.ContractParam.array(c);
  }
};
exports.param = param;