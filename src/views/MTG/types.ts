export type ImageURIs = {
  small: string;
  medium: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
};

export type CardFace = {
  image_uris: ImageURIs;
};

export type CardData = {
  id: string;
  name: string;
  image_uris?: ImageURIs;
  card_faces?: CardFace[];
};

export type SearchData = {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: CardData[];
};
