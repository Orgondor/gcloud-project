import * as React from 'react';
import sprites from '../../../images/sprites/*.png';
import './dwmTypes';

import {
  Card,
  Image,
} from 'semantic-ui-react';

const FamilyBreedingCard = ({family}: {
  family: Family,
}) => (
  <div style={{width: '150px', padding: '5px'}}>
    <Card>
      <div style={{height: '100px', marginTop: '5px'}}>
        <Image
          src={sprites[`${family.name}-family`]}
          size='tiny'
          centered
        />
      </div>
      <Card.Content>
        <Card.Header>{family.name}</Card.Header>
      </Card.Content>
    </Card>
  </div>
);

export default FamilyBreedingCard;