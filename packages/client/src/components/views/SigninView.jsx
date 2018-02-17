// Imports
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Signin from "../Signin/Signin";

class SignInView extends Component {
  render() {
    return <Signin {...this.props} />;
  }
}

export default inject("store")(observer(SignInView));
