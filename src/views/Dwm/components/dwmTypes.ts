export type Monster = {
  id: number;
  name: string;
  familyId: number;
};

export type Family = {
  id: number;
  name: string;
};

export type SelectFamily = {
  id: number;
  name: string;
  selected: boolean;
};

export type Breeding = {
  resultId: number;
  parent1Id?: number;
  parent1FamliyId?: number;
  parent2Id?: number;
  parent2NeededPlus?: number;
  parent2FamliyId?: number;
};

export type ParentType = "monster" | "family";

export type Parent1 = Monster & {
  type: ParentType;
};

export type Parent2 = Parent1 & {
  neededPlus?: number;
};

export type Breed = {
  result: Monster;
  parent1: Parent1;
  parent2: Parent2;
};

export type MonsterSummary = {
  id: number;
  name: string;
  familyId: number;
  family: string;
  breedFrom: Breed[];
  breedTo: Breed[];
};

export type MonsterDataCollection = {
  monsters: Monster[];
  families: Family[];
  breeding: Breeding[];
};
