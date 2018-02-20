// Module imports
import base58 from "bs58";
import { u, sc } from "@cityofzion/neon-js";
import { unhexlify } from "binascii";
import * as moment from "moment";
const { hash256 } = u;

// Config
import { ADDR_VERSION } from "./../config";

/**
 * Deserializes a serialized array that's passed as a hexstring
 * @param {hexstring} rawData
 */
export const deserialize = rawData => {
  // Split into bytes of 2 characters
  const rawSplitted = rawData.match(/.{2}/g);

  // The size of the length of your array.
  // It's in hex so the length is max 255.
  const collectionLenLen = parseInt(rawSplitted[0], 16);
  let offset = collectionLenLen + 1; // offset is malleable

  // Get the amount of elements in your array.
  const collectionLen = parseInt(concatBytes(rawSplitted, 1, offset), 16);

  const rawArray = [];

  for (let i = 0; i < collectionLen; i += 1) {
    const incOffset = offset + 1;
    // The size of the length of your item.
    // It's in hex so the length is max 255.
    const itemLenLen = parseInt(
      concatBytes(rawSplitted, offset, incOffset),
      16
    );
    const offsetItemLenLen = incOffset + itemLenLen;

    // Get the length of your item
    const itemLen = parseInt(
      concatBytes(rawSplitted, incOffset, offsetItemLenLen),
      16
    );
    const offsetItemLen = offsetItemLenLen + itemLen;

    // Store to rawArray
    rawArray.push(concatBytes(rawSplitted, offsetItemLenLen, offsetItemLen));

    // Abuse malleable offset
    offset = offsetItemLen;
  }

  return rawArray;
};

/**
 * Returns a concatted string of bytes from source, from start
 * @param {array} source
 * @param {int} start
 * @param {int} length
 */
const concatBytes = (source, start, length) => {
  let temp = "";
  for (let i = start; i < length; i += 1) temp += source[i];
  return temp;
};

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

/**
 * Extends unhexlify
 * @param {hexstring} param
 */
export const unhex = param => {
  return unhexlify(param);
};

/**
 * Converts Neoblog data to a formatted Timestamp
 * @param {hexstring} raw
 */
export const hexToTimestamp = raw => {
  const unformatted = moment.unix(parseInt(u.reverseHex(raw), 16));
  return unformatted.format("MMMM Do YYYY, HH:mm");
};

export const param = {
  string: c => {
    return sc.ContractParam.string(c);
  },
  array: c => {
    return sc.ContractParam.array(c);
  }
};
