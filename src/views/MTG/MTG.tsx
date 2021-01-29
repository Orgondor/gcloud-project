import * as React from 'react';
import qs from "qs";
import axios from "axios";
import { useAppState } from '../../hooks/useAppState';

import {
  Button,
  Card,
  Form,
  Input,
  Image,
  Segment,
  Label,
  Grid,
  Sticky,
} from 'semantic-ui-react';

type ImageURIs = {
  small: string;
  medium: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

type CardFace = {
  image_uris: ImageURIs
};

type CardData = {
  id: string,
  name: string,
  image_uris?: ImageURIs
  card_faces?: CardFace[];
};

type SearchData = {
  object: string,
  total_cards: number,
  has_more: boolean,
  next_page?: string,
  data: CardData[]
};

const CardImage = (props: {card: CardData, onClick: (image_uris: ImageURIs) => unknown}) => {
  const { card, onClick } = props;
  const image_uris = card.image_uris || (card.card_faces && card.card_faces[0].image_uris);
  const clickFunc = image_uris ? onClick : (image_uris: ImageURIs) => {}
  return (
    <Card onClick={() => clickFunc(image_uris)}>
      {
        image_uris ?
          <Image
            wrapped
            ui={false}
            src={image_uris.small}
            centered
          />
        :
          <Image
            wrapped
            ui={false}
            centered
          >
            {card.name}
            <Label content='Image not found!' icon='warning' />
          </Image>
      }
    </Card>
);
}

const MTG = () => {
  const appState = useAppState();

  // test string:  c:red pow=3 o="attacks" cmc=3
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<SearchData>({object: "list", total_cards: 0, has_more: false, data: []});
  const [currentImage, setCurrentImage] = React.useState("");

  const contextRef = React.useRef(null);

  const setQuery = (search: string) => {
    setSearch(search);
  }


  const doSearch = () => {
    console.log(search);
    fetch();
  };

  const fetch = async () => {
    const instance = axios.create({baseURL: "https://api.scryfall.com"});
    const result = await instance({
      method: "GET",
      url: "/cards/search",
      params: {q: search},
      paramsSerializer: function(params) {
        return qs.stringify(params);
      },
    })
    console.log("Search result:", result);
    if (result.status === 200) {
      setData(result.data);
    }
  };

  React.useEffect(() => {
    console.log("New data:", data);
  }, [data])

  return (
    <Segment>
      <Form>
        <Input fluid placeholder="search" onChange={(e, {value}) => {setQuery(value)}} />
        <Button onClick={() => doSearch()}>Search</Button>
      </Form>
      <Segment>
        <div ref={contextRef}>
          <Grid>
            <Grid.Column width={3}>
              <Card.Group stackable>
                {
                  data.data.map((card, i) => {
                    return (
                      <div key={card.id} style={{width: '150px', padding: '2px'}}>
                        <CardImage card={card} onClick={(image_uris) => {setCurrentImage(image_uris.png)}} />
                      </div>
                    );
                  })
                }
              </Card.Group>
            </Grid.Column>
            <Grid.Column width={10}>
              <Sticky context={contextRef} offset={50}>
                <Image
                  src={currentImage}
                  centered
                />
              </Sticky>
            </Grid.Column>
          </Grid>
        </div>
      </Segment>
    </Segment>
  );
}

export default MTG;