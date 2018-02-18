import React from "react";
import { inject, observer } from "mobx-react";

// Components
import Signin from "./../Signin/Signin";
import Account from "../Account/Account";

// Styles
import "./MenuShell.css";

const MenuShell = props => {
  const { signedIn } = props.store.app.states.menuStates;
  if (signedIn)
    return (
      <div className="neoblogMenu">
        <Account />
      </div>
    );
  return (
    <div className="neoblogMenu">
      <div className="ctaSignIn">
        <p>Use a WIF or NEP-2 key to sign in.</p>
        <p>
          <strong>
            This data is stored locally since our application uses your browser!
            Never use your WIF online or decrypt your NEP-2 key on a website!
          </strong>
        </p>
      </div>
      <Signin />
    </div>
  );
};

export default inject("store")(observer(MenuShell));
