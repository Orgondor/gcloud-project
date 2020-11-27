import * as React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Home from './views/Home';
import Dwm from './views/Dwm/Dwm';
import Render from './views/Render/Render';

type ViewRoute = {
  routeOrder: number,
  title: string,
  url: string,
  Component: () => JSX.Element,
}

const routes: ViewRoute[] = [
  {
    routeOrder: 9,
    title: 'Home',
    url: '/',
    Component: Home,
  },
  {
    routeOrder: 1,
    title: 'Render',
    url: '/render',
    Component: Render,
  },
  {
    routeOrder: 2,
    title: 'Dragon Warrior Monsters',
    url: '/dwm',
    Component: Dwm,
  },
]

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Menu stackable >
            {routes.map((r, i) => (
              <Menu.Item key={i} as={Link} name={r.title} to={r.url} >
                {r.title}
              </Menu.Item>
            ))}
            <Menu.Item as={'a'} href='http://github.com/orgondor' icon='github' position='right' />
          </Menu>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div style={{maxWidth: '1216px', marginLeft: 'auto', marginRight: 'auto'}}>
          <Switch>
            {routes.sort((a, b) => a.routeOrder - b.routeOrder).map(({title, url, Component}, i) => {
              return (
              <Route key={i} path={url} render={() => <Component />} />
            )})}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Router