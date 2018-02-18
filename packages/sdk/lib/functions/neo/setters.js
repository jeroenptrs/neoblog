"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitPost = void 0;

var _neonJs = _interopRequireWildcard(require("@cityofzion/neon-js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var submitPost =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(host, contract, operation, args) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _neonJs.default.create.query({
              method: operation,
              params: args
            }).execute('http://localhost:30333') // Neon.CONST.DEFAULT_RPC.MAIN // Tried host, http://localhost:5000/v2/network/nodes - none work
            .then(function (res) {
              console.log(_neonJs.default.serialize.tx(res.result));
            });
            /*
            const props: Neon.scriptParams = {
              scriptHash: contract,
              operation: operation,
              args: args,
              useTailCall: false
            };
             // Returns a hexstring
            const vmScript = Neon.sc.createScript(props);
             const invokeOperation = Neon.create.contractParam('String', 'operation');
             const invokeArgs = sc.ContractParam.array(args);
              return new Promise((resolve, reject) => {
              rpc.Query.invoke(contract, invokeOperation, invokeArgs)
                .then((res) => {
                  console.log(res)
                })
            });
            */


          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function submitPost(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.submitPost = submitPost;