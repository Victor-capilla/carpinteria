export type GenericUpdate<
  T,
  K extends (keyof T)[]
> = Partial<Pick<T, Exclude<keyof T, K[number]>>>