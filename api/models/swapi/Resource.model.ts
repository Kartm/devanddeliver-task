// based on https://github.com/mrzzcn/swapi-typescript/

export enum ResourceType {
  Film = "films",
  People = "people",
  Planet = "planets",
  Species = "species",
  Starship = "starships",
  Vehicle = "vehicles",
}

export type ResourceUrl = string;

export default interface Resource {
  url: ResourceUrl;
  id: string;
  created: string;
  edited: string;
}
