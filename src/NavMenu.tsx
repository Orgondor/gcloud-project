import * as React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { ViewRoute } from "./router";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

type NavMenuProps = {
  routes: ViewRoute[];
};

const menuItems = (
  routes: ViewRoute[],
  onClick: () => unknown
): JSX.Element[] => {
  return [
    ...routes.map((r, i) => (
      <Menu.Item
        key={`routes_${i}`}
        as={Link}
        name={r.title}
        to={r.url}
        onClick={onClick}
      >
        {r.title}
      </Menu.Item>
    )),
    <Menu.Item
      key="github"
      as={"a"}
      href="http://github.com/orgondor"
      icon
      position="right"
    >
      <MediaQuery maxWidth={767}>
        <p>
          <Icon name="github" />
        </p>
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <Icon name="github" />
      </MediaQuery>
    </Menu.Item>,
  ];
};

const NavMenu = ({ routes }: NavMenuProps): JSX.Element => {
  const [showItems, setShowItems] = React.useState(false);

  return (
    <nav>
      <Menu stackable>
        <MediaQuery maxWidth={767}>
          <Menu.Item icon onClick={() => setShowItems(!showItems)}>
            <p>
              <Icon name="bars" />
            </p>
          </Menu.Item>
          {showItems && menuItems(routes, () => setShowItems(!showItems))}
        </MediaQuery>
        <MediaQuery minWidth={768}>
          {menuItems(routes, () => undefined)}
        </MediaQuery>
      </Menu>
    </nav>
  );
};

export default NavMenu;
