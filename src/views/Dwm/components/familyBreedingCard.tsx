import * as React from 'react';
import sprites from '../../../images/sprites/*.png';
import './dwmTypes';

import {
  Header,
  Image,
} from 'semantic-ui-react';

const FamilyBreedingCard = ({family}: {
  family: Parent2,
}) => (
  <div style={{width: '200px'}}>
    <Image
      src={sprites[`${family.name}-family`]}
      fluid
      centered
    />
    <Header textAlign='center'>
      {family.name + ' family' + (family.neededPlus ? '+' + family.neededPlus : '')}
    </Header>
  </div>
);

export default FamilyBreedingCard;