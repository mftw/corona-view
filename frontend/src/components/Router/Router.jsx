import React from "react";
import { Switch, Route } from "react-router-dom";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";

import { PageStyles as animationClasses, Pageify } from "../Page/Page";
import NotFound from "../Pages/NotFound/NotFound";
import { routes } from "./routes";

export * from "./routes";

const Router = props => {
  const location = useLocation();

  const routeClasses = {
    appear: animationClasses.enter,
    appearActive: animationClasses.enterActive,
    enter: animationClasses.enter,
    enterActive: animationClasses.enterActive,
    exit: animationClasses.exit,
    exitActive: animationClasses.exitActive
  };

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 650, exit: 950 }}
        mountOnEnter
        unmountOnExit
        classNames={routeClasses}
      >
        <Switch location={location}>
          {routes.map(route => {
            if (route.noPage) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={Pageify(route.component, { route })}
              />
            );
          })}
          <Route
            key={"not-found"}
            component={Pageify(NotFound, { route: routes[0] })}
          />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Router;
