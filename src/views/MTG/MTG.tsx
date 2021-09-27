import * as React from "react";
import qs from "qs";
import axios, { AxiosResponse } from "axios";
import { useAppState } from "../../hooks/useAppState";

import { Button, Form, Input, Image, Segment } from "semantic-ui-react";
import {
  CardList,
  CardListEntry,
  MTGContentContainer,
} from "./components/styled";
import { getCardImageURIs } from "./util";
import { SearchData } from "./types";
import CardNavigationImage from "./components/CardNavigationImage";

const MTG: React.FC = () => {
  const appState = useAppState();

  // test string:  c:red pow=3 o="attacks" cmc=3
  const [search, setSearch] = React.useState(`o:"token" cmc:5 color:w`);
  const [list, setList] = React.useState<SearchData>({
    object: "list",
    total_cards: 0,
    has_more: false,
    data: [],
  });
  const [error, setError] = React.useState<AxiosResponse<any>>(undefined);
  const [currentCard, setCurrentCard] = React.useState(0);

  const setQuery = (search: string) => {
    setSearch(search);
  };

  const doSearch = () => {
    console.log(search);
    fetchList();
    setCurrentCard(0);
  };

  const fetchList = async () => {
    const instance = axios.create({ baseURL: "https://api.scryfall.com" });
    const result = await instance({
      method: "GET",
      url: "/cards/search",
      params: { q: search },
      paramsSerializer: function (params) {
        return qs.stringify(params);
      },
    });
    console.log("Search result:", result);
    if (result.status === 200) {
      setList(result.data);
    } else {
      setError(result);
    }
  };

  React.useEffect(() => {
    console.log("New data:", list);
  }, [list]);

  React.useEffect(() => {
    doSearch();
  }, []);

  const card = list.data[currentCard];
  console.log("current card:", card);

  return (
    <Segment>
      <Form>
        <Input
          fluid
          placeholder="search"
          onChange={(e, { value }) => {
            setQuery(value);
          }}
        />
        <Button onClick={() => doSearch()}>Search</Button>
      </Form>
      <Segment>
        {error ? (
          <div>
            <h2>Query failed</h2>
            {JSON.stringify(error)}
          </div>
        ) : (
          <MTGContentContainer>
            <CardList>
              {list.data.map((card, i) => {
                return (
                  <CardListEntry
                    key={card.id}
                    onClick={() => {
                      setCurrentCard(i);
                    }}
                  >
                    {card.name}
                  </CardListEntry>
                );
              })}
            </CardList>
            <CardNavigationImage
              index={currentCard - 1}
              card={list.data[currentCard - 1]}
              onClick={(index) => {
                setCurrentCard(index);
              }}
            />
            <div style={{ width: "auto" }}>
              {card ? (
                <Image src={getCardImageURIs(card).large} centered />
              ) : null}
            </div>
            <CardNavigationImage
              index={currentCard + 1}
              card={list.data[currentCard + 1]}
              onClick={(index) => {
                setCurrentCard(index);
              }}
            />
          </MTGContentContainer>
        )}
      </Segment>
    </Segment>
  );
};

export default MTG;
