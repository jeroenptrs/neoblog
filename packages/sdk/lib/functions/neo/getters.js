"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressFromUserId = exports.getUserData = exports.getArticleData = exports.getArticle = exports.getLatestPost = exports.getLatest = void 0;

require("@babel/polyfill");

var _neonJs = require("@cityofzion/neon-js");

var _neo = require("./../../helpers/neo");

var _conversion = require("./../../helpers/conversion");

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var s2h = _neonJs.u.str2hexstring,
    i2h = _neonJs.u.int2hex,
    h2s = _neonJs.u.hexstring2str;

var getLatest =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(host, contract, domain) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = parseInt;
            _context.next = 3;
            return (0, _neo.getStorage)(host, contract, s2h(domain + "latest"));

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getLatest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getLatest = getLatest;

var getLatestPost =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(host, contract) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getLatest(host, contract, "post");

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getLatestPost(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getLatestPost = getLatestPost;

var getArticle =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(host, contract, index) {
    var domain, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            domain = s2h("post.") + i2h(index);
            _context3.next = 3;
            return (0, _neo.getStorage)(domain);

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", h2s(result));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getArticle(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getArticle = getArticle;

var getArticleData =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(host, contract, article) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _neo.getStorage)(host, contract, s2h("post.data." + article));

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getArticleData(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getArticleData = getArticleData;

var getUserData =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(host, contract, user) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _neo.getStorage)(host, contract, s2h("user.") + user);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getUserData(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUserData = getUserData;

var getAddressFromUserId =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(host, contract, userId) {
    var result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _neo.getStorage)(host, contract, s2h("user.userid." + userId));

          case 2:
            result = _context6.sent;
            return _context6.abrupt("return", criptHashToAddress(result));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getAddressFromUserId(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAddressFromUserId = getAddressFromUserId;