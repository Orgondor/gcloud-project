import React from "react";
import { Card, Image, Label } from "semantic-ui-react";
import { CardData } from "../types";
import { getCardImageURIs } from "../util";
import { CardNavigationColumn } from "./styled";

type CardImageProps = {
  card: CardData;
  index: number;
  onClick?: (cardIndex: number) => void;
};

const CardNavigationImage: React.FC<CardImageProps> = (props) => {
  const { card, index, onClick } = props;
  const image_uris = getCardImageURIs(card);

  if (!card || index < 0) {
    return null;
  }

  return (
    <CardNavigationColumn>
      <Card onClick={() => onClick && onClick(index)}>
        {image_uris ? (
          <Image wrapped ui={false} src={image_uris.small} centered />
        ) : (
          <Image wrapped ui={false} centered>
            {card.name}
            <Label content="Image not found!" icon="warning" />
          </Image>
        )}
      </Card>
    </CardNavigationColumn>
  );
};

export default CardNavigationImage;
