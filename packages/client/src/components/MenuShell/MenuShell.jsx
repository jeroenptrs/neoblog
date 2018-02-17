import React from "react";
import { inject, observer } from "mobx-react";

// Components
import Signin from "./../Signin/Signin";

// Styles
import "./MenuShell.css";

const MenuShell = props => {
  const { signedIn } = props.store.app.states;
  if (signedIn) return <div className="neoblogMenu">U mama boi</div>;
  return <Signin />;
};

export default inject("store")(observer(MenuShell));
