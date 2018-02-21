"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getBestRPCNode", {
  enumerable: true,
  get: function get() {
    return _getters.getBestRPCNode;
  }
});
Object.defineProperty(exports, "deserialize", {
  enumerable: true,
  get: function get() {
    return _conversion.deserialize;
  }
});
Object.defineProperty(exports, "scriptHashToAddress", {
  enumerable: true,
  get: function get() {
    return _conversion.scriptHashToAddress;
  }
});
Object.defineProperty(exports, "addressToScriptHash", {
  enumerable: true,
  get: function get() {
    return _conversion.addressToScriptHash;
  }
});
Object.defineProperty(exports, "unhex", {
  enumerable: true,
  get: function get() {
    return _conversion.unhex;
  }
});
Object.defineProperty(exports, "hexToTimestamp", {
  enumerable: true,
  get: function get() {
    return _conversion.hexToTimestamp;
  }
});
Object.defineProperty(exports, "determineKey", {
  enumerable: true,
  get: function get() {
    return _neo.determineKey;
  }
});
exports.default = void 0;

require("@babel/polyfill");

var _getters = require("./functions/neo/getters");

var _account = require("./functions/neo/account");

var _conversion = require("./helpers/conversion");

var _neo = require("./helpers/neo");

var _setters = require("./functions/neo/setters");

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Neoblog =
/*#__PURE__*/
function () {
  function Neoblog(host, contract) {
    var account = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, Neoblog);

    this.host = host;
    this.contract = contract;

    if (account) {
      var decodedAccount = (0, _account.decodeJwt)(account);
      this.account = decodedAccount;
    } else this.account = undefined;

    this.getLatest = this.getLatest.bind(this);
    this.getLatestPost = this.getLatestPost.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getArticleData = this.getArticleData.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getAddressFromUserId = this.getAddressFromUserId.bind(this);
    this.processAuthentication = this.processAuthentication.bind(this);
  }

  _createClass(Neoblog, [{
    key: "executeGetter",
    value: function executeGetter(getter, param) {
      return param ? getter(this.host, this.contract, param) : getter(this.host, this.contract);
    }
  }, {
    key: "executeSetter",
    value: function executeSetter(setter, operation, args) {
      return setter(this.host, this.contract, this.account, operation, args);
    }
  }, {
    key: "getLatest",
    value: function getLatest(domain) {
      return this.executeGetter(_getters.getLatest, domain);
    }
  }, {
    key: "getLatestPost",
    value: function getLatestPost() {
      return this.executeGetter(_getters.getLatestPost);
    }
  }, {
    key: "getArticle",
    value: function getArticle(domainPre, index) {
      var data = {
        domainPre: domainPre,
        index: index
      };
      return this.executeGetter(_getters.getArticle, data);
    }
  }, {
    key: "getArticleData",
    value: function getArticleData(article) {
      return this.executeGetter(_getters.getArticleData, article);
    }
  }, {
    key: "getUserData",
    value: function getUserData(user) {
      return this.executeGetter(_getters.getUserData, user);
    }
  }, {
    key: "getAddressFromUserId",
    value: function getAddressFromUserId(userId) {
      return this.executeGetter(_getters.getAddressFromUserId, userId);
    }
  }, {
    key: "processAuthentication",
    value: function () {
      var _processAuthentication2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(token, password) {
        var WIF, account, address, privateKey, userName, jwt;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                WIF = (0, _account.processAuthentication)(token, password);

                if (!WIF) {
                  _context.next = 11;
                  break;
                }

                account = (0, _account.createAccount)(WIF);
                address = account.address;
                privateKey = account.privateKey;
                _context.next = 7;
                return this.getUserData((0, _conversion.addressToScriptHash)(address));

              case 7:
                userName = _context.sent;
                this.account = {
                  WIF: WIF,
                  address: address,
                  privateKey: privateKey,
                  userName: userName
                };

                if (typeof Storage !== "undefined") {
                  jwt = this.generateJwt(this.account);
                  localStorage.setItem("neoblogAccount", jwt);
                }

                return _context.abrupt("return", true);

              case 11:
                return _context.abrupt("return", false);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function processAuthentication(_x, _x2) {
        return _processAuthentication2.apply(this, arguments);
      };
    }()
  }, {
    key: "generateJwt",
    value: function generateJwt(userObject) {
      var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "neoblog";
      return (0, _account.generateJwt)(userObject, secret);
    }
  }, {
    key: "submitPost",
    value: function submitPost(postHash, category) {
      var address = (0, _conversion.addressToScriptHash)(this.account.address);
      return this.executeSetter(_setters.handleInvoke, "submitPost", [_conversion.param.string(address), _conversion.param.string(postHash), _conversion.param.string(category)]);
    }
  }, {
    key: "updateUsername",
    value: function updateUsername(newUserName) {
      var oldUserName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "undefined";
      var address = (0, _conversion.addressToScriptHash)(this.account.address);
      console.log(oldUserName);
      return this.executeSetter(_setters.handleInvoke, "manageUser", [_conversion.param.string(address), _conversion.param.string(newUserName), _conversion.param.string(oldUserName)]);
    }
  }, {
    key: "getAccount",
    value: function getAccount() {
      return this.account;
    }
  }]);

  return Neoblog;
}();

exports.default = Neoblog;