import * as React from 'react';
import './dwmTypes';

import {
  Card,
  Icon,
} from 'semantic-ui-react';

const FamilyCard = ({family, onClick}: {family: SelectFamily, onClick: (id: number) => void}) => (
  <div style={{width: '150px', padding: '5px'}}>
    <Card onClick={() => onClick(family.id)} >
      {/* <div style={{margin: '5px'}}>
        <Image src={sprites[`${family.name}-family`]} />
      </div> */}
      <Card.Content>
        <Card.Header>
          <Icon name={family.selected ? 'check square outline' : 'square outline'} />
          {family.name}
        </Card.Header>
      </Card.Content>
    </Card>
  </div>
);

export default FamilyCard;