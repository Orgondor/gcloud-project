import * as React from "react";
import { Header, Image } from "semantic-ui-react";
import { Parent2 } from "./dwmTypes";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sprites = require("../../../images/sprites/*.png") as Record<
  string,
  string
>;

const FamilyBreedingCard = ({ family }: { family: Parent2 }): JSX.Element => (
  <div style={{ width: "200px" }}>
    <Image src={sprites[`${family.name}-family`]} fluid centered />
    <Header textAlign="center">
      {family.name +
        " family" +
        (family.neededPlus ? "+" + family.neededPlus : "")}
    </Header>
  </div>
);

export default FamilyBreedingCard;
