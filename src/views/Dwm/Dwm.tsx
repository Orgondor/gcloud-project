import * as React from 'react';
import { useAppState } from '../../hooks/useAppState';
import MonsterSearch from './components/monsterSearch';
import MonsterBreading from './components/monsterBreading';
import './components/dwmTypes';

import {
  Segment,
} from 'semantic-ui-react';

const importData = require('../../data/data.json') as {
  monsters: Monster[],
  families: Family[],
  breeding: Breeding[],
};

const Dwm = () => {
  const appState = useAppState();
  const [families, setFamilies] = React.useState(importData.families.map((f) => ({...f, selected: true})));
  const [filter, setFilter] = React.useState('');
  const [selected, setSelected] = React.useState([] as Monster[]);

  const pushSelected = (monster: Monster) => {
    setSelected([...selected, monster]);
  }

  const popSelected = () => {
    const popped = selected.slice();
    popped.pop();
    setSelected(popped);
  }

  const emptySelected = () => {
    setSelected([]);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selected])

  return (
    <Segment>
      {
        selected.length ? (
          <MonsterBreading
            data={importData}
            selected={selected}
            goBack={popSelected}
            toSearch={emptySelected}
            onClickMonster={pushSelected}
          />
        ) : (
          <MonsterSearch
            data={importData}
            families={families}
            setFamilies={setFamilies}
            filter={filter}
            setFilter={setFilter}
            onClickMonster={pushSelected}
          />
        )
      }
    </Segment>
  );
}

export default Dwm;