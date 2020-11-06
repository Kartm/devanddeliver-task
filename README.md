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
Responds the user data.

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