// Imports
import { inject, observer } from "mobx-react";

import views from "./../views/views";

const Redirect = props => {
  if (props.to === "post") {
    props.store.router.goTo(
      views.postPage,
      {
        ...props.store.router.params,
        page: 1
      },
      props.store
    );
  }
  return null;
};
export default inject("store")(observer(Redirect));
