"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryHttpsProxy = void 0;

var axios = _interopRequireWildcard(require("axios"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var httpsProxy = "https://wt-eb8e8a5788a32c0054649520e12aca04-0.sandbox.auth0-extend.com/neo-https-proxy";
/**
 * Forwards the url and requestparams to Webtask
 * @param {string} url
 * @param {object} req
 */

var queryHttpsProxy = function queryHttpsProxy(url, req) {
  var jsonRequest = axios.create({
    headers: {
      "Content-Type": "application/json"
    }
  });
  var reqData = {
    url: url,
    requestData: req
  };
  return jsonRequest.post(httpsProxy, reqData).then(function (response) {
    return response.data;
  });
};

exports.queryHttpsProxy = queryHttpsProxy;