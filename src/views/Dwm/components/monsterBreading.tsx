import * as React from "react";
import { Image, Button, Header, Grid, Segment } from "semantic-ui-react";
import FamilyBreedingCard from "./familyBreedingCard";
import MonsterBreedingCard from "./monsterBreedingCard";
import { Monster, MonsterDataCollection, Breed, ParentType } from "./dwmTypes";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sprites = require("../../../images/sprites/*.png") as Record<
  string,
  string
>;

const MonsterBreeding = ({
  selected,
  goBack,
  toSearch,
  onClickMonster,
  data,
}: {
  selected: Monster[];
  goBack: () => void;
  toSearch: () => void;
  onClickMonster: (monster: Monster) => unknown;
  data: MonsterDataCollection;
}): JSX.Element => {
  const { monsters, families, breeding } = data;
  const monster = selected[selected.length - 1];

  const getFamilyName = (id: number): string =>
    families.find((f) => f.id === id)?.name || "";
  const getMonsterName = (id: number): string =>
    monsters.find((m) => m.id === id)?.name || "";
  const getMonsterFamilyId = (id: number): number =>
    monsters.find((m) => m.id === id).familyId;

  const getBreedFrom = (monster: Monster): Breed[] => {
    const breedFrom = breeding
      .filter(
        (b) => b.resultId === monster.id && (b.parent1Id || b.parent1FamilyId)
      )
      .map(
        (b): Breed => {
          const id1 = b.parent1Id || b.parent1FamilyId;
          const name1 = b.parent1Id ? getMonsterName(id1) : getFamilyName(id1);
          const familyId1 = b.parent1Id ? getMonsterFamilyId(id1) : id1;
          const type1: ParentType = b.parent1Id ? "monster" : "family";

          const id2 = b.parent2Id || b.parent2FamilyId;
          const name2 = b.parent2Id ? getMonsterName(id2) : getFamilyName(id2);
          const familyId2 = b.parent2Id ? getMonsterFamilyId(id2) : id2;
          const type2: ParentType = b.parent2Id ? "monster" : "family";

          return {
            result: {
              id: monster.id,
              name: monster.name,
              familyId: monster.familyId,
            },
            parent1: {
              id: id1,
              name: name1,
              familyId: familyId1,
              type: type1,
            },
            parent2: {
              id: id2,
              name: name2,
              familyId: familyId2,
              type: type2,
              neededPlus: b.parent2NeededPlus,
            },
          };
        }
      );
    return breedFrom || [];
  };

  const getBreedTo = (monster: Monster): Breed[] => {
    const p1 = breeding
      .filter((b) => b.parent1Id === monster.id)
      .map(
        (b): Breed => {
          const id2 = b.parent2Id || b.parent2FamilyId;
          const name2 = b.parent2Id ? getMonsterName(id2) : getFamilyName(id2);
          const familyId2 = b.parent2Id ? getMonsterFamilyId(id2) : id2;
          const type2: ParentType = b.parent2Id ? "monster" : "family";

          return {
            result: {
              id: b.resultId,
              name: getMonsterName(b.resultId),
              familyId: getMonsterFamilyId(b.resultId),
            },
            parent1: {
              id: monster.id,
              name: monster.name,
              familyId: monster.familyId,
              type: "monster",
            },
            parent2: {
              id: id2,
              name: name2,
              familyId: familyId2,
              type: type2,
              neededPlus: b.parent2NeededPlus,
            },
          };
        }
      );

    const f1 = breeding
      .filter((b) => b.parent1FamilyId === monster.familyId)
      .map(
        (b): Breed => {
          const id2 = b.parent2Id || b.parent2FamilyId;
          const name2 = b.parent2Id ? getMonsterName(id2) : getFamilyName(id2);
          const familyId2 = b.parent2Id ? getMonsterFamilyId(id2) : id2;
          const type2: ParentType = b.parent2Id ? "monster" : "family";

          return {
            result: {
              id: b.resultId,
              name: getMonsterName(b.resultId),
              familyId: getMonsterFamilyId(b.resultId),
            },
            parent1: {
              id: monster.familyId,
              name: getFamilyName(monster.familyId),
              familyId: monster.familyId,
              type: "family",
            },
            parent2: {
              id: id2,
              name: name2,
              familyId: familyId2,
              type: type2,
              neededPlus: b.parent2NeededPlus,
            },
          };
        }
      );

    const p2 = breeding
      .filter((b) => b.parent2Id === monster.id && b.parent2Id !== b.parent1Id)
      .map(
        (b): Breed => {
          const id1 = b.parent1Id || b.parent1FamilyId;
          const name1 = b.parent1Id ? getMonsterName(id1) : getFamilyName(id1);
          const familyId1 = b.parent1Id ? getMonsterFamilyId(id1) : id1;
          const type1: ParentType = b.parent1Id ? "monster" : "family";

          return {
            result: {
              id: b.resultId,
              name: getMonsterName(b.resultId),
              familyId: getMonsterFamilyId(b.resultId),
            },
            parent1: {
              id: id1,
              name: name1,
              familyId: familyId1,
              type: type1,
            },
            parent2: {
              id: monster.id,
              name: monster.name,
              familyId: monster.familyId,
              type: "monster",
              neededPlus: b.parent2NeededPlus,
            },
          };
        }
      );

    const f2 = breeding
      .filter((b) => b.parent2FamilyId === monster.familyId)
      .map(
        (b): Breed => {
          const id1 = b.parent1Id || b.parent1FamilyId;
          const name1 = b.parent1Id ? getMonsterName(id1) : getFamilyName(id1);
          const familyId1 = b.parent1Id ? getMonsterFamilyId(id1) : id1;
          const type1: ParentType = b.parent1Id ? "monster" : "family";

          return {
            result: {
              id: b.resultId,
              name: getMonsterName(b.resultId),
              familyId: getMonsterFamilyId(b.resultId),
            },
            parent1: {
              id: id1,
              name: name1,
              familyId: familyId1,
              type: type1,
            },
            parent2: {
              id: monster.familyId,
              name: getFamilyName(monster.familyId),
              familyId: monster.familyId,
              type: "family",
              neededPlus: b.parent2NeededPlus,
            },
          };
        }
      );

    return [...p1.reverse(), ...p2.reverse(), ...f1, ...f2];
  };

  const breedFrom = getBreedFrom(monster);
  const breedTo = getBreedTo(monster);

  return (
    <Segment>
      <Button basic onClick={() => goBack()}>
        Back
      </Button>
      {selected.length > 1 ? (
        <Button basic onClick={() => toSearch()}>
          To Search
        </Button>
      ) : null}
      <div style={{ paddingTop: "15px" }}>
        <Image src={sprites[`${monster.name}`]} centered size="tiny" />
        <Header textAlign="center">{monster.name}</Header>
      </div>
      <div style={{ height: "30px" }} />
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width="6">
            <Segment>
              <Header textAlign="center">Breed From</Header>
              {breedFrom.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  {b.parent1.type === "monster" ? (
                    <MonsterBreedingCard
                      monster={b.parent1}
                      onClick={onClickMonster}
                    />
                  ) : (
                    <FamilyBreedingCard family={b.parent1} />
                  )}

                  <div style={{ width: "40px" }}>
                    <Header textAlign="center">{"+"}</Header>
                  </div>

                  {b.parent2.type === "monster" ? (
                    <MonsterBreedingCard
                      monster={b.parent2}
                      onClick={onClickMonster}
                      neededPlus={b.parent2.neededPlus}
                    />
                  ) : (
                    <FamilyBreedingCard family={b.parent2} />
                  )}
                </div>
              ))}
            </Segment>
          </Grid.Column>
          <Grid.Column width="10">
            <Segment>
              <Header textAlign="center">Breed Into</Header>
              {breedTo.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  {b.parent1.type === "monster" ? (
                    <MonsterBreedingCard
                      monster={b.parent1}
                      onClick={onClickMonster}
                    />
                  ) : (
                    <FamilyBreedingCard family={b.parent1} />
                  )}

                  <div style={{ width: "40px" }}>
                    <Header textAlign="center">{"+"}</Header>
                  </div>

                  {b.parent2.type === "monster" ? (
                    <MonsterBreedingCard
                      monster={b.parent2}
                      onClick={onClickMonster}
                      neededPlus={b.parent2.neededPlus}
                    />
                  ) : (
                    <FamilyBreedingCard family={b.parent2} />
                  )}

                  <div style={{ width: "40px" }}>
                    <Header textAlign="center">{"="}</Header>
                  </div>

                  <MonsterBreedingCard
                    monster={b.result}
                    onClick={onClickMonster}
                  />
                </div>
              ))}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default MonsterBreeding;
