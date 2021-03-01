import * as React from "react";
import { Card, Image } from "semantic-ui-react";
import { Monster } from "./dwmTypes";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sprites = require("../../../images/sprites/*.png") as Record<
  string,
  string
>;

type MonsterCardParams = {
  monster: Monster;
  onClick: (monster: Monster) => unknown;
};

const MonsterCard = ({ monster, onClick }: MonsterCardParams): JSX.Element => (
  <div style={{ width: "150px", padding: "5px" }}>
    <Card onClick={() => onClick(monster)}>
      <div style={{ height: "100px", display: "flex", alignItems: "center" }}>
        <Image src={sprites[`${monster.name}`]} size="tiny" centered />
      </div>
      <Card.Content>
        <Card.Header textAlign="center">{monster.name}</Card.Header>
      </Card.Content>
    </Card>
  </div>
);

export default MonsterCard;
