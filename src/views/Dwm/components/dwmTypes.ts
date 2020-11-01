type Monster = {
  id: number,
  name: string,
  familyId: number,
}

type Family = {
  id: number,
  name: string,
}

type SelectFamily = {
  id: number,
  name: string,
  selected: boolean,
}

type Breeding = {
  resultId: number,
  parent1Id?: number,
  parent1FamliyId?: number,
  parent2Id?: number,
  parent2NeededPlus?: number,
  parent2FamliyId?: number,
}

type ParentType = 'monster' | 'family'

type Parent1 = {
  id: number,
  name: string,
  type: ParentType,
}

type Parent2 = Parent1 & {
  neededPlus?: number,
}

type Offspring = {
  id: number,
  name: string,
}

type Breed = {
  result: Offspring,
  parent1: Parent1,
  parent2: Parent2,
}

type MonsterSummary = {
  id: number,
  name: string,
  familyId: number,
  family: string,
  breedFrom: Breed[],
  breedTo: Breed[],
}

type MonsterDataCollection = {
  monsters: Monster[],
  families: Family[],
  breeding: Breeding[],
}