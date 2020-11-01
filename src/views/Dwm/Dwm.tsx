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
  const [selected, setSelected] = React.useState(null as Monster);

  React.useEffect(() => {
  }, [appState])

  const onClickMonster = (monster: Monster) => {
    setSelected(monster);
  }

  return (
    <Segment>
      {
        selected ? (
          <MonsterBreading
            data={importData}
            monster={selected}
            goBack={() => {setSelected(null)}}
          />
        ) : (
          <MonsterSearch
            data={importData}
            families={families}
            setFamilies={setFamilies}
            filter={filter}
            setFilter={setFilter}
            onClickMonster={onClickMonster}
          />
        )
      }
    </Segment>
  );
}

export default Dwm;