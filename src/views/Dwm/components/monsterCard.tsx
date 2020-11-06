import * as React from 'react';
import sprites from '../../../images/sprites/*.png';
import './dwmTypes';

import {
  Card,
  Image,
} from 'semantic-ui-react';

const MonsterCard = ({monster, onClick}: {
  monster: Monster,
  onClick: (monster: Monster) => unknown,
}) => (
  <div style={{width: '150px', padding: '5px'}}>
    <Card onClick={() => onClick(monster)}>
      <div style={{height: '100px', display: 'flex', alignItems: 'center'}}>
        <Image
          src={sprites[`${monster.name}`]}
          size='tiny'
          centered
        />
      </div>
      <Card.Content>
        <Card.Header textAlign="center">{monster.name}</Card.Header>
      </Card.Content>
    </Card>
  </div>
);

export default MonsterCard;