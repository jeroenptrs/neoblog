"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitPost = void 0;

var _neonJs = _interopRequireWildcard(require("@cityofzion/neon-js"));

var _config = require("./../../config");

var _neo = require("./../../helpers/neo");

var _conversion = require("./../../helpers/conversion");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var submitPost =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(host, contract, account, operation, args) {
    var formattedOperation, formattedArgs, invoke, gasCost, intents, testResponse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            formattedOperation = _conversion.param.string(operation);
            formattedArgs = _conversion.param.array(args);
            invoke = (0, _neo.createInvoke)(contract, formattedOperation, formattedArgs);
            gasCost = 0;
            intents = [{
              assetId: _config.assets.GAS,
              value: 0.00000001,
              scriptHash: _neonJs.default.get.scriptHashFromAddress(account.address)
            }];
            console.log("setters");
            _context.next = 8;
            return (0, _neo.testInvoke)(host, invoke);

          case 8:
            testResponse = _context.sent;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function submitPost(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}(); // export default async function main() {
//   // Actual invoke params
//   const account = Neon.create.account(privnetWif);
//   const invoke = createInvoke(operation, args);
//   const gasCost = 0;
//   const intents = [
//     {
//       assetId: assets.GAS,
//       value: 0.00000001,
//       scriptHash: Neon.get.scriptHashFromAddress(account.address)
//     }
//   ];
//   // Test invoke
//   const testResponse = await testInvoke(invoke);
//   if (testResponse.result.gas_consumed < 10) {
//     const invokeResponse = await executeInvoke(
//       account,
//       invoke,
//       gasCost,
//       intents
//     );
//     console.log(invokeResponse);
//   }
// }


exports.submitPost = submitPost;