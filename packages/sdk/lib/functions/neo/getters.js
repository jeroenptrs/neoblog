"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressFromUserId = exports.getUserData = exports.getArticleData = exports.getArticle = exports.getLatestPost = exports.getLatest = exports.getBestRPCNode = void 0;

var _neonJs = require("@cityofzion/neon-js");

var _binascii = require("binascii");

var _neo = require("./../../helpers/neo");

var _conversion = require("./../../helpers/conversion");

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var s2h = _neonJs.u.str2hexstring,
    i2h = _neonJs.u.int2hex,
    h2s = _neonJs.u.hexstring2str;

var getBestRPCNode =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(host) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return api.neonDB.getRPCEndpoint(host);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getBestRPCNode(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getBestRPCNode = getBestRPCNode;

var getLatest =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(host, contract, domain) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = parseInt;
            _context2.next = 3;
            return (0, _neo.getStorage)(host, contract, s2h(domain + "latest"));

          case 3:
            _context2.t1 = _context2.sent;
            return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getLatest(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getLatest = getLatest;

var getLatestPost =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(host, contract) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getLatest(host, contract, "post.");

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getLatestPost(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getLatestPost = getLatestPost;

var getArticle =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(host, contract, data) {
    var domainPre, index, domain, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            domainPre = data.domainPre, index = data.index;
            domain = s2h(domainPre) + i2h(index);
            _context4.next = 4;
            return (0, _neo.getStorage)(host, contract, domain);

          case 4:
            result = _context4.sent;
            return _context4.abrupt("return", h2s(result));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getArticle(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getArticle = getArticle;

var getArticleData =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(host, contract, article) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _neo.getStorage)(host, contract, s2h("post.data." + article));

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getArticleData(_x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getArticleData = getArticleData;

var getUserData =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(host, contract, user) {
    var rawResult;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _neo.getStorage)(host, contract, s2h("user." + (0, _conversion.addressToScriptHash)(user))).catch(function (error) {
              return undefined;
            });

          case 2:
            rawResult = _context6.sent;
            return _context6.abrupt("return", rawResult ? (0, _binascii.unhexlify)(rawResult) : undefined);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getUserData(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getUserData = getUserData;

var getAddressFromUserId =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(host, contract, userId) {
    var result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _neo.getStorage)(host, contract, s2h("user.userid." + userId));

          case 2:
            result = _context7.sent;
            return _context7.abrupt("return", scriptHashToAddress(result));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getAddressFromUserId(_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getAddressFromUserId = getAddressFromUserId;