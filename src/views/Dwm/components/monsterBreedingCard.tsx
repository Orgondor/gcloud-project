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
  <Card onClick={() => onClick(monster)}>
    <div style={{height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{flexBasis: '80px'}}>
        <Image
          style={{flexGrow: 1}}
          src={sprites[`${monster.name}`]}
          fluid
          centered
        />
      </div>
    </div>
    <Card.Content>
      <Card.Header textAlign="center">{monster.name}</Card.Header>
    </Card.Content>
  </Card>
);

export default MonsterCard;