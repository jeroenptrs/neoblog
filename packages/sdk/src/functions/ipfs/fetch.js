import * as axios from "axios";

const ipfsGateway = "https://gateway.ipfs.io/ipfs/";

export const getFromGateway = async filehash => {
  const req = axios.create({});
  const result = await req.get(ipfsGateway + filehash);
  return result;
};
