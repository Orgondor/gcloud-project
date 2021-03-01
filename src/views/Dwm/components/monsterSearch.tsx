import * as React from "react";
import { Card, Segment, Input } from "semantic-ui-react";
import FamilyCard from "./familyCard";
import MonsterCard from "./monsterCard";
import { SelectFamily, Monster, MonsterDataCollection } from "./dwmTypes";

const listFamilies = (
  families: SelectFamily[],
  onClick: (id: number) => void
) =>
  families.map((f) => <FamilyCard key={f.id} family={f} onClick={onClick} />);

const listMonsters = (
  monsters: Monster[],
  families: SelectFamily[],
  filter: string,
  onClick: (monster: Monster) => unknown
) =>
  monsters
    .filter((m) => families.find((f) => f.id === m.familyId).selected)
    .filter((m) => filter === "" || m.name.toLowerCase().includes(filter))
    .map((m) => <MonsterCard key={m.id} monster={m} onClick={onClick} />);

type MonsterSearchParams = {
  data: MonsterDataCollection;
  families: SelectFamily[];
  setFamilies: (f: SelectFamily[]) => unknown;
  filter: string;
  setFilter: (f: string) => unknown;
  onClickMonster: (monster: Monster) => unknown;
};

const MonsterSearch = ({
  data,
  families,
  setFamilies,
  filter,
  setFilter,
  onClickMonster,
}: MonsterSearchParams): JSX.Element => {
  const onClickFamiliy = (id: number) => {
    const tmp = families.slice();
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].id === id) {
        tmp[i].selected = !tmp[i].selected;
        break;
      }
    }
    setFamilies(tmp);
  };

  return (
    <Segment>
      <div style={{ height: "60px" }}>
        <Input
          fluid
          placeholder="search"
          onChange={(e, { value }) => {
            setFilter(value);
          }}
        />
      </div>
      <Card.Group centered>{listFamilies(families, onClickFamiliy)}</Card.Group>
      <div style={{ height: "20px" }} />
      <Card.Group centered>
        {listMonsters(
          data.monsters,
          families,
          filter.toLowerCase(),
          onClickMonster
        )}
      </Card.Group>
    </Segment>
  );
};

export default MonsterSearch;
