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

var _neonJs = require("@cityofzion/neon-js");

var _binascii = require("binascii");

var _getters = require("./functions/neo/getters");

var _account = require("./functions/neo/account");

var _conversion = require("./helpers/conversion");

var _neo = require("./helpers/neo");

var _setters = require("./functions/neo/setters");

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
    value: function processAuthentication(token, password) {
      var WIF = (0, _account.processAuthentication)(token, password);

      if (WIF) {
        var account = (0, _account.createAccount)(WIF);
        var address = account.address;
        var privateKey = account.privateKey;
        this.account = {
          WIF: WIF,
          address: address,
          privateKey: privateKey
        };

        if (typeof Storage !== "undefined") {
          var jwt = this.generateJwt(this.account);
          localStorage.setItem("neoblogAccount", jwt);
        }

        return true;
      }

      return false;
    } // createWallet(password) {
    //   return createWallet(password);
    // };

  }, {
    key: "generateJwt",
    value: function generateJwt(userObject) {
      var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "neoblog";
      return (0, _account.generateJwt)(userObject, secret);
    }
  }, {
    key: "submitPost",
    value: function submitPost(postHash, category) {
      var address = (0, _binascii.unhexlify)(_neonJs.u.reverseHex(_neonJs.wallet.getScriptHashFromAddress(this.account.address)));
      return this.executeSetter(_setters.submitPost, "submitPost", [_conversion.param.string(address), _conversion.param.string(postHash), _conversion.param.string(category)]);
    }
  }]);

  return Neoblog;
}();

exports.default = Neoblog;