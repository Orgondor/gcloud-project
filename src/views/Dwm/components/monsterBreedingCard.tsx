import * as React from "react";
import { Header, Image } from "semantic-ui-react";
import { Monster } from "./dwmTypes";
import { useMediaQuery } from "react-responsive";
import "./hoverDropShadow.css";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sprites = require("../../../images/sprites/*.png") as Record<
  string,
  string
>;

const MonsterBreedingCard = ({
  monster,
  onClick,
  neededPlus,
}: {
  monster: Monster;
  onClick: (monster: Monster) => unknown;
  neededPlus?: number | undefined;
}): JSX.Element => {
  const scaleDown = useMediaQuery({ query: "(max-width: 532px)" });
  return (
    <div
      onClick={() => onClick(monster)}
      className="hover-drop-shadow"
      style={{
        width: scaleDown ? "75px" : "150px",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "1px",
      }}
    >
      <div
        style={{
          marginTop: scaleDown ? "5px" : "0px",
          height: scaleDown ? "30px" : "100px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src={sprites[`${monster.name}`]}
          size={scaleDown ? "mini" : "tiny"}
          centered
        />
      </div>
      <div style={{ marginTop: scaleDown ? "8px" : "0px" }}>
        <Header textAlign="center" as={scaleDown ? "h5" : "h3"}>
          {monster.name + (neededPlus ? " + " + neededPlus : "")}
        </Header>
      </div>
    </div>
  );
};

export default MonsterBreedingCard;
