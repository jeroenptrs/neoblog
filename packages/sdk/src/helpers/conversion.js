// Babel
import "@babel/polyfill";

// Module imports
import base58 from "bs58";
import { u, sc } from "@cityofzion/neon-js";
const { hash256 } = u;

// Config
import { ADDR_VERSION } from "./../../config";

/**
 * Converts a script hash, returned from the Neoblog smart contract, to an address
 * @param {string} scriptHash Hash to convert
 * @returns {string} converted address
 */
export const scriptHashToAddress = scriptHash => {
  const shaChecksum = hash256(ADDR_VERSION + scriptHash).substr(0, 8);
  return base58.encode(
    Buffer.from(ADDR_VERSION + scriptHash + shaChecksum, "hex")
  );
};

export const param = {
  string: c => {
    return sc.ContractParam.string(c);
  }
};
