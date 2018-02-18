import React from "react";
import { inject, observer } from "mobx-react";

// Components
import Signin from "./../Signin/Signin";

// Styles
import "./MenuShell.css";

const MenuShell = props => {
  const { signedIn } = props.store.app.states.menuStates;
  if (signedIn) return <div className="neoblogMenu">U mama boi</div>;
  return (
    <div className="neoblogMenu">
      <div className="ctaSignIn">
        <p>Use a WIF or NEP-2 key to sign in.</p>
        <p>
          <strong>
            This data will only be stored in your local browser storage and will
            not be shared with anyone.
          </strong>
        </p>
      </div>
      <Signin />
    </div>
  );
};

export default inject("store")(observer(MenuShell));
