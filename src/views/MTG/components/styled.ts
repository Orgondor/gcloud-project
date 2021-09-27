import styled from "styled-components";

const cardListWidth = 150;
const cardListHeight = 80;

export const CardList = styled.div`
  width: ${cardListWidth}px;
  height: ${cardListHeight}vh;
  overflow-y: scroll;
`;

export const CardListEntry = styled.div`
  width: ${cardListWidth - 10}px;
  overflow-wrap: normal;
  font-weight: bold;
  padding: 2px;
`;

export const CardNavigationColumn = styled.div`
  width: 160px;
  padding: 20px;
`;

export const MTGContentContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
`;
