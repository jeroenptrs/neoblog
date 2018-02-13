"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeInvoke = exports.testInvoke = exports.createInvoke = exports.getBalance = exports.getStorage = void 0;

var axios = _interopRequireWildcard(require("axios"));

var _neonJs = _interopRequireWildcard(require("@cityofzion/neon-js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var s2h = _neonJs.u.str2hexstring;
var sb = _neonJs.default.create.scriptBuilder;
/**
 * Gets the value out of a key from a contract on the NEO Blockchain
 * @param {string} host Host endpoint
 * @param {string} contract Contract address
 * @param {string} key Key - to - search
 */

var getStorage =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(host, contract, key) {
    var client, query;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _neonJs.api.neonDB.getRPCEndpoint(host);

          case 2:
            client = _context2.sent;
            query = _neonJs.default.create.query({
              method: "getstorage",
              params: [contract, key]
            });
            return _context2.abrupt("return", new Promise(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(resolve, reject) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        response = query.execute(client).then(function (res) {
                          if (res.result) resolve(res.result);else reject({
                            error: "No result found!"
                          });
                        }).catch(function (e) {
                          console.log("error!");
                          reject(e);
                        });

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getStorage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Queries the Blockchain DB for a user's current balance
 * @param {string} host Host endpoint
 * @param {string} neoAddress User address
 */


exports.getStorage = getStorage;

var getBalance =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(host, neoAddress) {
    var query, _query$data, net, address, balances;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return axios.get("".concat(host, "/v2/address/balance/").concat(neoAddress));

          case 2:
            query = _context3.sent;
            _query$data = query.data, net = _query$data.net, address = _query$data.address; // Create Balance object

            balances = new _neonJs.wallet.Balance({
              net: net,
              address: address
            });
            balances.addAsset("NEO", query.data.NEO);
            balances.addAsset("GAS", query.data.GAS);
            return _context3.abrupt("return", balances);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getBalance(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Create an invoke out of your params
 * @param {string} scriptHash Contract address
 * @param {string} operation Operation string
 * @param {array} args Argument array
 */


exports.getBalance = getBalance;

var createInvoke = function createInvoke(scriptHash, operation, args) {
  return {
    scriptHash: scriptHash,
    operation: operation,
    args: args
  };
};
/**
 *
 * @param {string} host Host endpoint
 * @param {object} invoke Invoke data
 */


exports.createInvoke = createInvoke;

var testInvoke =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(host, invoke) {
    var client;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _neonJs.api.neonDB.getRPCEndpoint(host);

          case 2:
            client = _context4.sent;
            // Create SC script
            sb().emitAppCall(invoke.scriptHash, invoke.operation.value, invoke.args, false); // Execute

            _context4.next = 6;
            return _neonJs.rpc.Query.invokeScript(sb.str).execute(client);

          case 6:
            return _context4.abrupt("return", _context4.sent);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function testInvoke(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *
 * @param {string} host Host endpoint
 * @param {object} account Account data
 * @param {object} invoke Invoke data
 * @param {number} gasCost Default 0
 * @param {array} intents Intent array
 */


exports.testInvoke = testInvoke;

var executeInvoke =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(host, account, invoke, gasCost, intents) {
    var client, script, balances, unsignedTx, signedTx;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _neonJs.api.neonDB.getRPCEndpoint(host);

          case 2:
            client = _context5.sent;
            // Create SC script
            sb().emitAppCall(invoke.scriptHash, invoke.operation.value, invoke.args, false); // toString()

            script = sb.str; // Create TX

            _context5.next = 7;
            return getBalance(account.address);

          case 7:
            balances = _context5.sent;
            unsignedTx = _neonJs.tx.Transaction.createInvocationTx(balances, intents, script, gasCost, {
              version: 1
            }); // Sign TX

            signedTx = _neonJs.tx.signTransaction(unsignedTx, account.privateKey); // Invoke

            return _context5.abrupt("return", _neonJs.rpc.queryRPC(client, {
              method: "sendrawtransaction",
              params: [_neonJs.tx.serializeTransaction(signedTx)],
              id: 1
            }));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function executeInvoke(_x10, _x11, _x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();
/* INVOKE SMART CONTRACT FUNCTIONS

import Neon, { sc, u } from "@cityofzion/neon-js";
import {
  createInvoke,
  executeInvoke,
  testInvoke,
  param
} from "./blockchain/contract";
import { scriptHash, privnetWif, localHost, assets } from "./blockchain/config";

const operation = param.string("testkey");
const args = param.string("testvalue");

export default async function main() {
  // Actual invoke params
  const account = Neon.create.account(privnetWif);
  const invoke = createInvoke(operation, args);
  const gasCost = 0;
  const intents = [
    {
      assetId: assets.GAS,
      value: 0.00000001,
      scriptHash: Neon.get.scriptHashFromAddress(account.address)
    }
  ];

  // Test invoke
  const testResponse = await testInvoke(invoke);
  if (testResponse.result.gas_consumed < 10) {
    const invokeResponse = await executeInvoke(
      account,
      invoke,
      gasCost,
      intents
    );
    console.log(invokeResponse);
  }
}

*/


exports.executeInvoke = executeInvoke;