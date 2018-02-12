"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _getters = require("./functions/neo/getters");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Neoblog =
/*#__PURE__*/
function () {
  function Neoblog(host, contract) {
    _classCallCheck(this, Neoblog);

    this.host = host;
    this.contract = contract;
  }

  _createClass(Neoblog, [{
    key: "executeGetter",
    value: function executeGetter(getter, param) {
      return param ? getter(this.host, this.contract, param) : getter(this.host, this.contract);
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
    value: function getArticle(index) {
      return this.executeGetter(_getters.getArticle, index);
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
  }]);

  return Neoblog;
}();

exports.default = Neoblog;