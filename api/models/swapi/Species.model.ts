// based on https://github.com/mrzzcn/swapi-typescript/

import Resource, { ResourceUrl } from "./Resource.model";

export default interface Species extends Resource {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: ResourceUrl[];
  films: ResourceUrl[];
}
