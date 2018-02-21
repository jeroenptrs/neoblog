"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleInvoke = void 0;

var _neonJs = _interopRequireWildcard(require("@cityofzion/neon-js"));

var _config = require("./../../config");

var _neo = require("./../../helpers/neo");

var _conversion = require("./../../helpers/conversion");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var handleInvoke =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(host, contract, account, operation, args) {
    var invoke, gasCost, intents, testResponse, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            invoke = (0, _neo.createInvoke)(contract, operation, args);
            gasCost = 0;
            intents = [{
              assetId: _config.assets.GAS,
              value: 0.00000001,
              scriptHash: _neonJs.default.get.scriptHashFromAddress(account.address)
            }];
            _context.next = 5;
            return (0, _neo.testInvoke)(host, invoke);

          case 5:
            testResponse = _context.sent;

            if (!(testResponse.result.gas_consumed < 10)) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return (0, _neo.executeInvoke)(host, account, invoke, gasCost, intents);

          case 9:
            result = _context.sent;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handleInvoke(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleInvoke = handleInvoke;