export type TypePredicate<T> = (value: unknown) => value is T;
export type TypePredicateSubject<
  T extends TypePredicate<unknown>
> = T extends TypePredicate<infer S> ? S : never;
export type Hash<T> = Record<string, T>;
export type Primitive = string | number | boolean | symbol | null | undefined;
// Basic types
export const isAny = (value: unknown): value is unknown => true;
export const isUnknown = (value: unknown): value is unknown => true;
export const isString = (value: unknown): value is string =>
  typeof value === "string";
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";
export const isSymbol = (value: unknown): value is symbol =>
  typeof value === "symbol";
export const isNull = (value: unknown): value is null => value === null;
export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
// Compound types
export function isEither<T extends Array<TypePredicate<unknown>>>(
  ...predicates: T
) {
  return (value: unknown): value is TypePredicateSubject<T[number]> => {
    return predicates.some((predicate) => predicate(value));
  };
}
export function isHash<T extends TypePredicate<unknown>>(predicate: T) {
  return (value: unknown): value is Hash<TypePredicateSubject<T>> => {
    return isObject(value) && Object.values(value).every(predicate);
  };
}
export function isArray<T extends TypePredicate<unknown>>(predicate: T) {
  return (value: unknown): value is Array<TypePredicateSubject<T>> => {
    return Array.isArray(value) && value.every(predicate);
  };
}

export function isShape<T extends Hash<TypePredicate<unknown>>>(
  shape: T
): (value: unknown) => value is { [P in keyof T]: TypePredicateSubject<T[P]> } {
  const entries = Object.entries(shape);
  return (
    value: unknown
  ): value is { [P in keyof T]: TypePredicateSubject<T[P]> } => {
    return (
      isObject(value) &&
      entries.every(([key, predicate]) => predicate(value[key]))
    );
  };
}
