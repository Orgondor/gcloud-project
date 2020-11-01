import * as React from 'react';
import sprites from '../../../images/sprites/*.png';
import './dwmTypes';

import {
  Header,
  Image,
} from 'semantic-ui-react';

const MonsterBreedingCard = ({monster}: {
  monster: Parent2,
}) => (
  <div style={{width: '100px'}}>
    <Image
      src={sprites[`${monster.name}`]}
      size='tiny'
      centered
    />
    <Header textAlign='center'>
      {monster.name + (monster.neededPlus ? '+' + monster.neededPlus : '')}
    </Header>
  </div>
);

export default MonsterBreedingCard;