import * as React from 'react';
import sprites from '../../../images/sprites/*.png';
import './dwmTypes';

import {
  Image,
  Button,
  Header,
  Grid,
} from 'semantic-ui-react';

const MonsterBreeding = ({monster, goBack, data}: {
  monster: Monster,
  goBack: () => void,
  data: MonsterDataCollection,
}) => {
  const { monsters, families, breeding } = data;

  const getFamilyName = (id: number): string => families.find(f => f.id === id).name;
  const getMonsterName = (id: number): string => monsters.find(m => m.id === id).name;

  const getBreedFrom = (monster: Monster): Breed[] => {
    return breeding.filter((b) => b.resultId === monster.id).map((b): Breed => {
      const id1 = b.parent1Id || b.parent1FamliyId;
      if (!(b.parent1Id || b.parent1FamliyId)) {
        return;
      }
      const name1 = b.parent1Id ? getMonsterName(id1) : getFamilyName(id1);
      const type1: ParentType = b.parent1Id ? 'monster' : 'family';

      const id2 = b.parent2Id || b.parent2FamliyId;
      const name2 = b.parent2Id ? getMonsterName(id2) : getFamilyName(id2);
      const type2: ParentType = b.parent2Id ? 'monster' : 'family';

      return {
        result: {
          id: monster.id,
          name: monster.name,
        },
        parent1: {
          id: id1,
          name: name1,
          type: type1,
        },
        parent2: {
          id: id2,
          name: name2,
          type: type2,
          neededPlus: b.parent2NeededPlus,
        }
      }
    });
  };

  const getBreedTo = (monster: Monster): Breed[] => {
    const p1 = breeding.filter((b) => b.parent1Id === monster.id).map((b): Breed => {
      const id2 = b.parent2Id || b.parent2FamliyId;
      const name2 = b.parent2Id ? getMonsterName(id2) : getFamilyName(id2);
      const type2: ParentType = b.parent2Id ? 'monster' : 'family';

      return {
        result: {
          id: b.resultId,
          name: getMonsterName(b.resultId),
        },
        parent1: {
          id: monster.id,
          name: monster.name,
          type: 'monster',
        },
        parent2: {
          id: id2,
          name: name2,
          type: type2,
          neededPlus: b.parent2NeededPlus,
        }
      }
    });

    const f1 = breeding.filter((b) => b.parent1FamliyId === monster.familyId).map((b): Breed => {
      const id2 = b.parent2Id || b.parent2FamliyId;
      const name2 = b.parent2Id ? getMonsterName(id2) : getFamilyName(id2);
      const type2: ParentType = b.parent2Id ? 'monster' : 'family';

      return {
        result: {
          id: b.resultId,
          name: getMonsterName(b.resultId),
        },
        parent1: {
          id: monster.familyId,
          name: getFamilyName(monster.familyId),
          type: 'family',
        },
        parent2: {
          id: id2,
          name: name2,
          type: type2,
          neededPlus: b.parent2NeededPlus,
        }
      }
    });

    const p2 = breeding.filter((b) => b.parent2Id === monster.id).map((b): Breed => {
      const id1 = b.parent1Id || b.parent1FamliyId;
      const name1 = b.parent1Id ? getMonsterName(id1) : getFamilyName(id1);
      const type1: ParentType = b.parent1Id ? 'monster' : 'family';

      return {
        result: {
          id: b.resultId,
          name: getMonsterName(b.resultId),
        },
        parent1: {
          id: id1,
          name: name1,
          type: type1,
        },
        parent2: {
          id: monster.id,
          name: monster.name,
          type: 'monster',
          neededPlus: b.parent2NeededPlus,
        }
      }
    });

    const f2 = breeding.filter((b) => b.parent2FamliyId === monster.familyId).map((b): Breed => {
      const id1 = b.parent1Id || b.parent1FamliyId;
      const name1 = b.parent1Id ? getMonsterName(id1) : getFamilyName(id1);
      const type1: ParentType = b.parent1Id ? 'monster' : 'family';

      return {
        result: {
          id: b.resultId,
          name: getMonsterName(b.resultId),
        },
        parent1: {
          id: id1,
          name: name1,
          type: type1,
        },
        parent2: {
          id: monster.familyId,
          name: getFamilyName(monster.familyId),
          type: 'family',
          neededPlus: b.parent2NeededPlus,
        }
      }
    });

    return [
      ...f1,
      ...f2,
      ...p1,
      ...p2,
    ];
  };

  const breedFrom = getBreedFrom(monster);
  const breedTo = getBreedTo(monster);

  return (
    <div>
      <Button basic onClick={() => goBack()}>Back</Button>
      <div>
        <Image src={sprites[`${monster.name}`]} centered />
        <Header textAlign='center'>{monster.name}</Header>
      </div>
      <div style={{height: '30px'}} />
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width='8'>
            <Header textAlign='center'>Breed From</Header>
            {
              breedFrom.map(
                (b, i) => (
                  <Header key={i} textAlign='center'>
                    {b.parent1.name + ' + ' + b.parent2.name + 
                      (b.parent2.neededPlus ? '+' + b.parent2.neededPlus : '')
                    }
                  </Header>
                )
              )
            }
          </Grid.Column>
          <Grid.Column width='8'>
            <Header textAlign='center'>Breed Into</Header>
            {
              breedTo.map(
                (b, i) => (
                  <Header key={i} textAlign='center'>
                    {b.parent1.name + ' + ' + b.parent2.name + 
                      (b.parent2.neededPlus ? '+' + b.parent2.neededPlus : '')
                    }
                  </Header>
                )
              )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
};

export default MonsterBreeding;