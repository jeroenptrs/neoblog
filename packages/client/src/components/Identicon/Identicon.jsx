import React from "react";
import * as Identicon from "identicon.js";

const NeoblogIdenticon = props => {
  const hash = props.address;
  const options = {
    format: "svg",
    size: props.size
  };

  const data = new Identicon(hash, options).toString();
  return (
    <img width="40" height="40" src={`data:image/svg+xml;base64,${data}`} />
  );
};

export default NeoblogIdenticon;
