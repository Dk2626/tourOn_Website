import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isAdmin } from "./auth";
const SuperAdminRoute = ({ component: Component, ...rest }) => {
  const isAdminUser = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken === null) {
      return false;
    } else {
      const sa = [
        "dineshkumar.devadasan@touron.in",
        "vikashmanoharan@touron.in",
      ];
      return sa.includes(JSON.parse(authToken).user.email);
    }
  };

  console.log(`isAdminUkjbjhdvhjcvsdjvser()`, isAdminUser());

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdminUser() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/access-denied",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default SuperAdminRoute;
