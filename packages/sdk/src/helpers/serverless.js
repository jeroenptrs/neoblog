import * as axios from "axios";

const httpsProxy =
  "https://wt-eb8e8a5788a32c0054649520e12aca04-0.sandbox.auth0-extend.com/neo-https-proxy";

/**
 * Forwards the url and requestparams to Webtask
 * @param {string} url
 * @param {object} req
 */
export const queryHttpsProxy = (url, req) => {
  const jsonRequest = axios.create({
    headers: { "Content-Type": "application/json" }
  });
  const reqData = { url, requestData: req };
  return jsonRequest.post(httpsProxy, reqData).then(response => {
    return response.data;
  });
};
