import * as React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import NavMenu from "./NavMenu";
import Home from "./views/Home";
import Dwm from "./views/Dwm/Dwm";
import MTG from "./views/MTG/MTG";
import Render from "./views/Render/Render";
import QuadRender from "./views/Render/QuadRender";

export type ViewRoute = {
  title: string;
  url: string;
  Component: () => JSX.Element;
  exact: boolean;
};

const routes: ViewRoute[] = [
  {
    title: "Home",
    url: "/",
    Component: Home,
    exact: true,
  },
  {
    title: "Render",
    url: "/render",
    Component: Render,
    exact: false,
  },
  {
    title: "Shaders",
    url: "/shaders",
    Component: QuadRender,
    exact: false,
  },
  {
    title: "Dragon Warrior Monsters",
    url: "/dwm",
    Component: Dwm,
    exact: false,
  },
  // {
  //   title: "Magic: The Gathering",
  //   url: "/mtg",
  //   Component: MTG,
  //   exact: false,
  // },
];

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div>
        <NavMenu routes={routes} />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div
          style={{
            maxWidth: "1216px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Switch>
            {routes.map(({ url, Component, exact }, i) => (
              <Route
                exact={exact}
                key={i}
                path={url}
                render={() => <Component />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
