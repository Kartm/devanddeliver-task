// based on https://github.com/mrzzcn/swapi-typescript/

import Resource, { ResourceUrl } from "./Resource.model";

export default interface Film extends Resource {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: ResourceUrl[];
  planets: ResourceUrl[];
  starships: ResourceUrl[];
  vehicles: ResourceUrl[];
  species: ResourceUrl[];
}
