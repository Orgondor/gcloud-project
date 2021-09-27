import { CardData } from "./types";

export const getCardImageURIs = (card: CardData) => {
  return card.image_uris || (card.card_faces && card.card_faces[0].image_uris);
};
