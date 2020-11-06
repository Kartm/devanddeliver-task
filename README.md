# Testing the API:

1. Start the Docker daemon: `sudo dockerd`
2. Compose the Docker: `sudo docker-compose up`


# Available endpoints:

## Register
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

### Response

**Code** : `200 OK`

```json
{
    "id": 8,
    "email": "some@mail.com",
    "swPeopleId": 80
}
```

## Login
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

### Response

**Code** : `200 OK`

```json
{
    "id": 5,
    "email": "some@mail.com",
    "swPeopleId": 20,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMTgyNCwiZXhwIjoxNjA0Njk4MjI0fQ.X0b64Nu_gtmeZVdzTbUL0rph8PTsKsPIRhQXuN5-7Fs"
}
```

## Fetching user
Sends the user data.

**URL** : `/api/user`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

### Response

**Code** : `200 OK`

```json
{
    "id": 5,
    "email": "some@mail.com",
    "person": {
        "name": "Yoda",
        "height": "66",
        "mass": "17",
        "hair_color": "white",
        "skin_color": "green",
        "eye_color": "brown",
        "birth_year": "896BBY",
        "gender": "male",
        "homeworld": "http://swapi.dev/api/planets/28/",
        "films": [
            "http://swapi.dev/api/films/2/",
            "http://swapi.dev/api/films/3/",
            "http://swapi.dev/api/films/4/",
            "http://swapi.dev/api/films/5/",
            "http://swapi.dev/api/films/6/"
        ],
        "species": [
            "http://swapi.dev/api/species/6/"
        ],
        "vehicles": [],
        "starships": [],
        "created": "2014-12-15T12:26:01.042000Z",
        "edited": "2014-12-20T21:17:50.345000Z",
        "url": "http://swapi.dev/api/people/20/"
    }
}
```

---

## Hero films
Responds the films associated with the user's Star Wars person.

**URL** : `/api/user/films`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

### Response

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

## Hero films by id
Responds the films associated with the user's Star Wars person by id.

**URL** : `/api/user/films/{id}`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

### Response

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

## Hero species
Responds the films associated with the user's Star Wars person.

**URL** : `/api/user/species`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

### Response

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

## Hero species by id
Responds the films associated with the user's Star Wars person by id.

**URL** : `/api/user/films/{id}`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

### Response

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

## Hero vehicles
Returns the vehicles associated with the user's Star Wars person.

**URL** : `/api/user/vehicles`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

### Response

**Code** : `200 OK`

```json

```

## Hero vehicles by id
Returns the films associated with the user's Star Wars person by id.

**URL** : `/api/user/vehicles/{id}`

**Method** : `GET`

**Auth required** : YES

**Example authorization header**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYwNDYxMDA5MywiZXhwIjoxNjA0Njk2NDkzfQ.gWMgf6OMG14vjMI6u2imemUm0oFt8ZteSCwpwQNgHYg
```

### Response

**Code** : `200 OK`

```json

```