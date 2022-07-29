import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavMenu from "./NavMenu";
import BaseRedirect from "./views/BaseRedirect";
import Dwm from "./views/Dwm/Dwm";
import MTG from "./views/MTG/MTG";
import WaveCollapse from "./views/WaveCollapse";
import Render from "./views/Render/Render";
import QuadRender from "./views/Render/QuadRender";

export type ViewRoute = {
  title: string;
  url: string;
  Component: React.FC;
  exact: boolean;
  menu: boolean;
};

const routes: ViewRoute[] = [
  {
    title: "Shaders",
    url: "/shaders",
    Component: QuadRender,
    exact: false,
    menu: true,
  },
  {
    title: "Render",
    url: "/render",
    Component: Render,
    exact: false,
    menu: true,
  },
  {
    title: "Wave Function Collapse",
    url: "/wave-collapse",
    Component: WaveCollapse,
    exact: false,
    menu: true,
  },
  {
    title: "Dragon Warrior Monsters",
    url: "/dwm",
    Component: Dwm,
    exact: false,
    menu: true,
  },
  // {
  //   title: "Magic: The Gathering",
  //   url: "/mtg",
  //   Component: MTG,
  //   exact: false,
  //   menu: true,
  // },
  {
    title: "BaseRedirect",
    url: "/",
    Component: BaseRedirect,
    exact: false,
    menu: false,
  },
];

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
          }}
        >
          <NavMenu routes={routes} />
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div
          style={{
            maxWidth: "1216px",
            marginLeft: "auto",
            marginRight: "auto",
            flex: "1 1 auto",
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
