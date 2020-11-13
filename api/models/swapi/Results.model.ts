// based on https://github.com/mrzzcn/swapi-typescript/

export default interface Results<T> {
  count: number;
  next?: string;
  previous: string;
  results: T[];
}
