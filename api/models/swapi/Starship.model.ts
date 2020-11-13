// based on https://github.com/mrzzcn/swapi-typescript/

import Resource, { ResourceUrl } from "./Resource.model";

export default interface Starship extends Resource {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: ResourceUrl[];
  films: ResourceUrl[];
}
