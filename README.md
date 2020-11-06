
- [Testing the API](#testing-the-api)
- [Available endpoints](#available-endpoints)
  - [Register](#register)
  - [Login](#login)
  - [Fetching the user](#fetching-the-user)
  - [Getting hero films](#getting-hero-films)
  - [Getting hero films by id](#getting-hero-films-by-id)
  - [Getting hero species](#getting-hero-species)
  - [Getting hero species by id](#getting-hero-species-by-id)
  - [Getting hero vehicles](#getting-hero-vehicles)
  - [Getting hero vehicles by id](#getting-hero-vehicles-by-id)
  - [Getting hero starships](#getting-hero-starships)
  - [Getting hero starships by id](#getting-hero-starships-by-id)
  - [Getting hero planet](#getting-hero-planet)

## Launching the project

1. Start the Docker daemon: `sudo dockerd`
2. Compose the Docker: `sudo docker-compose up`
3. The API is exposed at `127.0.0.1:8123`

## Available endpoints

### Register
Used to register a user. Automatically assigns a random Star Wars person.

**URL** : `/api/user/register`

**Method** : `POST`

**Auth required** : NO

**Example body**

```json
{
    "email": "some@mail.com",
    "password": "somepassword"
}
```

**Response**

**Code** : `200 OK`

```json
{
    "id": 2,
    "email": "some@mail.com",
    "swHeroId": 72
}
```

### Login
Used to login a user. Responds with a JWT token.

**URL** : `/api/user/login`

**Method** : `POST`

**Auth required** : NO

**Example body**

```json
{
    "email": "some@mail.com",
    "password": "somepassword"
}
```

**Response**

**Code** : `200 OK`

```json
{
    "id": 2,
    "email": "some@mail.com",
    "swHeroId": 72,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYwNDY1MDU2MywiZXhwIjoxNjA0NzM2OTYzfQ.Xbj4LpYdKEQnL4dHEVkDYhrxBdH1rD59J0vzLFf52hI"
}
```

### Fetching the user
Sends the user data.

**URL** : `/api/user`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "id": 1,
    "email": "as3d@mail.com",
    "hero": {
        "name": "Leia Organa",
        "height": "150",
        "mass": "49",
        "hair_color": "brown",
        "skin_color": "light",
        "eye_color": "brown",
        "birth_year": "19BBY",
        "gender": "female",
        "homeworld": "http://swapi.dev/api/planets/2/",
        "films": [
            "http://swapi.dev/api/films/1/",
            "http://swapi.dev/api/films/2/",
            "http://swapi.dev/api/films/3/",
            "http://swapi.dev/api/films/6/"
        ],
        "species": [],
        "vehicles": [
            "http://swapi.dev/api/vehicles/30/"
        ],
        "starships": [],
        "created": "2014-12-10T15:20:09.791000Z",
        "edited": "2014-12-20T21:17:50.315000Z",
        "url": "http://swapi.dev/api/people/5/"
    }
}
```

---

### Getting hero films
Responds the films associated with the user's Star Wars person.

**URL** : `/api/user/films`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "films": [
        {
            "title": "The Empire Strikes Back",
            "episode_id": 5,
            "opening_crawl": "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
            "director": "Irvin Kershner",
            "producer": "Gary Kurtz, Rick McCallum",
            "release_date": "1980-05-17",
            "characters": [
                "http://swapi.dev/api/people/1/",
                "http://swapi.dev/api/people/2/",
                "http://swapi.dev/api/people/3/",
                "http://swapi.dev/api/people/4/",
                "http://swapi.dev/api/people/5/",
                "http://swapi.dev/api/people/10/",
                "http://swapi.dev/api/people/13/",
                "http://swapi.dev/api/people/14/",
                "http://swapi.dev/api/people/18/",
                "http://swapi.dev/api/people/20/",
                "http://swapi.dev/api/people/21/",
                "http://swapi.dev/api/people/22/",
                "http://swapi.dev/api/people/23/",
                "http://swapi.dev/api/people/24/",
                "http://swapi.dev/api/people/25/",
                "http://swapi.dev/api/people/26/"
            ],
            "planets": [
                "http://swapi.dev/api/planets/4/",
                "http://swapi.dev/api/planets/5/",
                "http://swapi.dev/api/planets/6/",
                "http://swapi.dev/api/planets/27/"
            ],
            "starships": [
                "http://swapi.dev/api/starships/3/",
                "http://swapi.dev/api/starships/10/",
                "http://swapi.dev/api/starships/11/",
                "http://swapi.dev/api/starships/12/",
                "http://swapi.dev/api/starships/15/",
                "http://swapi.dev/api/starships/17/",
                "http://swapi.dev/api/starships/21/",
                "http://swapi.dev/api/starships/22/",
                "http://swapi.dev/api/starships/23/"
            ],
            "vehicles": [
                "http://swapi.dev/api/vehicles/8/",
                "http://swapi.dev/api/vehicles/14/",
                "http://swapi.dev/api/vehicles/16/",
                "http://swapi.dev/api/vehicles/18/",
                "http://swapi.dev/api/vehicles/19/",
                "http://swapi.dev/api/vehicles/20/"
            ],
            "species": [
                "http://swapi.dev/api/species/1/",
                "http://swapi.dev/api/species/2/",
                "http://swapi.dev/api/species/3/",
                "http://swapi.dev/api/species/6/",
                "http://swapi.dev/api/species/7/"
            ],
            "created": "2014-12-12T11:26:24.656000Z",
            "edited": "2014-12-15T13:07:53.386000Z",
            "url": "http://swapi.dev/api/films/2/"
        }
    ]
```

### Getting hero films by id
Responds the films associated with the user's Star Wars person by id.

**URL** : `/api/user/films/{id}`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "films": [
        {
            "title": "The Empire Strikes Back",
            "episode_id": 5,
            "opening_crawl": "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
            "director": "Irvin Kershner",
            "producer": "Gary Kurtz, Rick McCallum",
            "release_date": "1980-05-17",
            "characters": [
                "http://swapi.dev/api/people/1/",
                "http://swapi.dev/api/people/2/",
                "http://swapi.dev/api/people/3/",
                "http://swapi.dev/api/people/4/",
                "http://swapi.dev/api/people/5/",
                "http://swapi.dev/api/people/10/",
                "http://swapi.dev/api/people/13/",
                "http://swapi.dev/api/people/14/",
                "http://swapi.dev/api/people/18/",
                "http://swapi.dev/api/people/20/",
                "http://swapi.dev/api/people/21/",
                "http://swapi.dev/api/people/22/",
                "http://swapi.dev/api/people/23/",
                "http://swapi.dev/api/people/24/",
                "http://swapi.dev/api/people/25/",
                "http://swapi.dev/api/people/26/"
            ],
            "planets": [
                "http://swapi.dev/api/planets/4/",
                "http://swapi.dev/api/planets/5/",
                "http://swapi.dev/api/planets/6/",
                "http://swapi.dev/api/planets/27/"
            ],
            "starships": [
                "http://swapi.dev/api/starships/3/",
                "http://swapi.dev/api/starships/10/",
                "http://swapi.dev/api/starships/11/",
                "http://swapi.dev/api/starships/12/",
                "http://swapi.dev/api/starships/15/",
                "http://swapi.dev/api/starships/17/",
                "http://swapi.dev/api/starships/21/",
                "http://swapi.dev/api/starships/22/",
                "http://swapi.dev/api/starships/23/"
            ],
            "vehicles": [
                "http://swapi.dev/api/vehicles/8/",
                "http://swapi.dev/api/vehicles/14/",
                "http://swapi.dev/api/vehicles/16/",
                "http://swapi.dev/api/vehicles/18/",
                "http://swapi.dev/api/vehicles/19/",
                "http://swapi.dev/api/vehicles/20/"
            ],
            "species": [
                "http://swapi.dev/api/species/1/",
                "http://swapi.dev/api/species/2/",
                "http://swapi.dev/api/species/3/",
                "http://swapi.dev/api/species/6/",
                "http://swapi.dev/api/species/7/"
            ],
            "created": "2014-12-12T11:26:24.656000Z",
            "edited": "2014-12-15T13:07:53.386000Z",
            "url": "http://swapi.dev/api/films/2/"
        }
    ]
```

---

### Getting hero species
Responds the films associated with the user's Star Wars person.

**URL** : `/api/user/species`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "species": [
        {
            "name": "Droid",
            "classification": "artificial",
            "designation": "sentient",
            "average_height": "n/a",
            "skin_colors": "n/a",
            "hair_colors": "n/a",
            "eye_colors": "n/a",
            "average_lifespan": "indefinite",
            "homeworld": null,
            "language": "n/a",
            "people": [
                "http://swapi.dev/api/people/2/",
                "http://swapi.dev/api/people/3/",
                "http://swapi.dev/api/people/8/",
                "http://swapi.dev/api/people/23/"
            ],
            "films": [
                "http://swapi.dev/api/films/1/",
                "http://swapi.dev/api/films/2/",
                "http://swapi.dev/api/films/3/",
                "http://swapi.dev/api/films/4/",
                "http://swapi.dev/api/films/5/",
                "http://swapi.dev/api/films/6/"
            ],
            "created": "2014-12-10T15:16:16.259000Z",
            "edited": "2014-12-20T21:36:42.139000Z",
            "url": "http://swapi.dev/api/species/2/"
        },
        {
            "name": "Wookie",
            "classification": "mammal",
            "designation": "sentient",
            "average_height": "210",
            "skin_colors": "gray",
            "hair_colors": "black, brown",
            "eye_colors": "blue, green, yellow, brown, golden, red",
            "average_lifespan": "400",
            "homeworld": "http://swapi.dev/api/planets/14/",
            "language": "Shyriiwook",
            "people": [
                "http://swapi.dev/api/people/13/",
                "http://swapi.dev/api/people/80/"
            ],
            "films": [
                "http://swapi.dev/api/films/1/",
                "http://swapi.dev/api/films/2/",
                "http://swapi.dev/api/films/3/",
                "http://swapi.dev/api/films/6/"
            ],
            "created": "2014-12-10T16:44:31.486000Z",
            "edited": "2014-12-20T21:36:42.142000Z",
            "url": "http://swapi.dev/api/species/3/"
        },
        {
            "name": "Rodian",
            "classification": "sentient",
            "designation": "reptilian",
            "average_height": "170",
            "skin_colors": "green, blue",
            "hair_colors": "n/a",
            "eye_colors": "black",
            "average_lifespan": "unknown",
            "homeworld": "http://swapi.dev/api/planets/23/",
            "language": "Galatic Basic",
            "people": [
                "http://swapi.dev/api/people/15/"
            ],
            "films": [
                "http://swapi.dev/api/films/1/"
            ],
            "created": "2014-12-10T17:05:26.471000Z",
            "edited": "2014-12-20T21:36:42.144000Z",
            "url": "http://swapi.dev/api/species/4/"
        },
        {
            "name": "Hutt",
            "classification": "gastropod",
            "designation": "sentient",
            "average_height": "300",
            "skin_colors": "green, brown, tan",
            "hair_colors": "n/a",
            "eye_colors": "yellow, red",
            "average_lifespan": "1000",
            "homeworld": "http://swapi.dev/api/planets/24/",
            "language": "Huttese",
            "people": [
                "http://swapi.dev/api/people/16/"
            ],
            "films": [
                "http://swapi.dev/api/films/1/",
                "http://swapi.dev/api/films/3/"
            ],
            "created": "2014-12-10T17:12:50.410000Z",
            "edited": "2014-12-20T21:36:42.146000Z",
            "url": "http://swapi.dev/api/species/5/"
        },
        {
            "name": "Yoda's species",
            "classification": "mammal",
            "designation": "sentient",
            "average_height": "66",
            "skin_colors": "green, yellow",
            "hair_colors": "brown, white",
            "eye_colors": "brown, green, yellow",
            "average_lifespan": "900",
            "homeworld": "http://swapi.dev/api/planets/28/",
            "language": "Galactic basic",
            "people": [
                "http://swapi.dev/api/people/20/"
            ],
            "films": [
                "http://swapi.dev/api/films/2/",
                "http://swapi.dev/api/films/3/",
                "http://swapi.dev/api/films/4/",
                "http://swapi.dev/api/films/5/",
                "http://swapi.dev/api/films/6/"
            ],
            "created": "2014-12-15T12:27:22.877000Z",
            "edited": "2014-12-20T21:36:42.148000Z",
            "url": "http://swapi.dev/api/species/6/"
        }
    ]
}
```

### Getting hero species by id
Responds the films associated with the user's Star Wars person by id.

**URL** : `/api/user/films/{id}`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "film": {
        "name": "Yoda's species",
        "classification": "mammal",
        "designation": "sentient",
        "average_height": "66",
        "skin_colors": "green, yellow",
        "hair_colors": "brown, white",
        "eye_colors": "brown, green, yellow",
        "average_lifespan": "900",
        "homeworld": "http://swapi.dev/api/planets/28/",
        "language": "Galactic basic",
        "people": [
            "http://swapi.dev/api/people/20/"
        ],
        "films": [
            "http://swapi.dev/api/films/2/",
            "http://swapi.dev/api/films/3/",
            "http://swapi.dev/api/films/4/",
            "http://swapi.dev/api/films/5/",
            "http://swapi.dev/api/films/6/"
        ],
        "created": "2014-12-15T12:27:22.877000Z",
        "edited": "2014-12-20T21:36:42.148000Z",
        "url": "http://swapi.dev/api/species/6/"
    }
}
```

---

### Getting hero vehicles
Returns the vehicles associated with the user's Star Wars person.

**URL** : `/api/user/vehicles`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "vehicles": [
        {
            "name": "Imperial Speeder Bike",
            "model": "74-Z speeder bike",
            "manufacturer": "Aratech Repulsor Company",
            "cost_in_credits": "8000",
            "length": "3",
            "max_atmosphering_speed": "360",
            "crew": "1",
            "passengers": "1",
            "cargo_capacity": "4",
            "consumables": "1 day",
            "vehicle_class": "speeder",
            "pilots": [
                "http://swapi.dev/api/people/1/",
                "http://swapi.dev/api/people/5/"
            ],
            "films": [
                "http://swapi.dev/api/films/3/"
            ],
            "created": "2014-12-18T11:20:04.625000Z",
            "edited": "2014-12-20T21:30:21.693000Z",
            "url": "http://swapi.dev/api/vehicles/30/"
        }
    ]
}
```

### Getting hero vehicles by id
Returns vehicles associated with the user's Star Wars person by id.

**URL** : `/api/user/vehicles/{id}`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "vehicle": {
        "name": "Imperial Speeder Bike",
        "model": "74-Z speeder bike",
        "manufacturer": "Aratech Repulsor Company",
        "cost_in_credits": "8000",
        "length": "3",
        "max_atmosphering_speed": "360",
        "crew": "1",
        "passengers": "1",
        "cargo_capacity": "4",
        "consumables": "1 day",
        "vehicle_class": "speeder",
        "pilots": [
            "http://swapi.dev/api/people/1/",
            "http://swapi.dev/api/people/5/"
        ],
        "films": [
            "http://swapi.dev/api/films/3/"
        ],
        "created": "2014-12-18T11:20:04.625000Z",
        "edited": "2014-12-20T21:30:21.693000Z",
        "url": "http://swapi.dev/api/vehicles/30/"
    }
}
```

---

### Getting hero starships
Returns the starships associated with the user's Star Wars person.

**URL** : `/api/user/starships`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "starships": [
        {
            "name": "Millennium Falcon",
            "model": "YT-1300 light freighter",
            "manufacturer": "Corellian Engineering Corporation",
            "cost_in_credits": "100000",
            "length": "34.37",
            "max_atmosphering_speed": "1050",
            "crew": "4",
            "passengers": "6",
            "cargo_capacity": "100000",
            "consumables": "2 months",
            "hyperdrive_rating": "0.5",
            "MGLT": "75",
            "starship_class": "Light freighter",
            "pilots": [
                "http://swapi.dev/api/people/13/",
                "http://swapi.dev/api/people/14/",
                "http://swapi.dev/api/people/25/",
                "http://swapi.dev/api/people/31/"
            ],
            "films": [
                "http://swapi.dev/api/films/1/",
                "http://swapi.dev/api/films/2/",
                "http://swapi.dev/api/films/3/"
            ],
            "created": "2014-12-10T16:59:45.094000Z",
            "edited": "2014-12-20T21:23:49.880000Z",
            "url": "http://swapi.dev/api/starships/10/"
        }
    ]
}
```

### Getting hero starships by id
Returns starships associated with the user's Star Wars person by id.

**URL** : `/api/user/starships/{id}`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "starship": {
        "name": "Millennium Falcon",
        "model": "YT-1300 light freighter",
        "manufacturer": "Corellian Engineering Corporation",
        "cost_in_credits": "100000",
        "length": "34.37",
        "max_atmosphering_speed": "1050",
        "crew": "4",
        "passengers": "6",
        "cargo_capacity": "100000",
        "consumables": "2 months",
        "hyperdrive_rating": "0.5",
        "MGLT": "75",
        "starship_class": "Light freighter",
        "pilots": [
            "http://swapi.dev/api/people/13/",
            "http://swapi.dev/api/people/14/",
            "http://swapi.dev/api/people/25/",
            "http://swapi.dev/api/people/31/"
        ],
        "films": [
            "http://swapi.dev/api/films/1/",
            "http://swapi.dev/api/films/2/",
            "http://swapi.dev/api/films/3/"
        ],
        "created": "2014-12-10T16:59:45.094000Z",
        "edited": "2014-12-20T21:23:49.880000Z",
        "url": "http://swapi.dev/api/starships/10/"
    }
}
```

---

### Getting hero planet
Returns the planet associated with the user's Star Wars person.

**URL** : `/api/user/planet`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

**Response**

**Code** : `200 OK`

```json
{
    "planet": {
        "name": "Sullust",
        "rotation_period": "20",
        "orbital_period": "263",
        "diameter": "12780",
        "climate": "superheated",
        "gravity": "1",
        "terrain": "mountains, volcanoes, rocky deserts",
        "surface_water": "5",
        "population": "18500000000",
        "residents": [
            "http://swapi.dev/api/people/31/"
        ],
        "films": [],
        "created": "2014-12-18T11:25:40.243000Z",
        "edited": "2014-12-20T20:58:18.474000Z",
        "url": "http://swapi.dev/api/planets/33/"
    }
}
```
