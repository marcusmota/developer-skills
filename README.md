# Developer - Skills API


It's a simple api using Node.js with MySQL as database, jest as test environment, UUID to be our unique identifier to ours IDs and the sequelize as ORM.

The goal of this backend is provide these 3 endpoints

*1 - We want to be able to insert this JSON shape in our database*

```
{
	"company": "MarcusMota Company",
	"name": "Marcus Mota",
	"languages": ["Javascript", "Java"]
}
```

*2 - We want to be able to receive the report with the list of all the languages and the companies that are using it*

```
[
  {
    "language": "Javascript",
    "companies": [
      "Uber"
    ]
  },
  {
    "language": "Java",
    "companies": [
      "Google",
      "AWS"
    ]
  },
  {
    "language": "PHP",
    "companies": [
      "AWS"
    ]
  }
]
```

*3 - We want to be able to receive this report with the number of developers per language*


```
{
  "Javascript": 2,
  "PHP": 1,
  "Java": 1
}
```

## Initial setup

The application is built with Node.js and MySQL as database . To start the application you need to have the `MySQL` and `Node.js` installed previously (in a new version of the solution we could have the application running in docker to avoid this step)

Once you have installed both, create a database called `challenge` and `challenge_test` both with password set to `dev` (Note: if you want you can change the `src/config/config.js` file to apply you database setup e.g database name, user and so on)

Run the `npm install` then `npm run migration` and `npm run migration-test` to create the tables schemas in the databases

## Running the API

Install the dependecies using `npm install` if you have not yet then type `npm run start-dev`, the application will be avaible on *PORT 3000* by default. You should see something similar in your terminal

`App running at port 3000 - env development - 2019-10-15T20:28:59.348Z`

### Endpoints Availables

To make either a post request or get request, open your postman and type one of the following URLs

Considering the `BASE_URL` as `http://localhost:3000`

`POST BASE_URL + /developers` - To create a new record in the database, this method expect this shape as the body

```
{
	"company": "MarcusMota Company",
	"name": "Marcus Mota",
	"languages": ["Javascript", "Java"]
}
```

`GET BASE_URL + /fetch-skills-with-companies` - To receive the report with the list of all the languages and the companies that are using it
```
[
  {
    "language": "Javascript",
    "companies": [
      "Uber"
    ]
  },
  {
    "language": "Java",
    "companies": [
      "Google",
      "AWS"
    ]
  },
  {
    "language": "PHP",
    "companies": [
      "AWS"
    ]
  }
]
```


`GET BASE_URL + /fetch-skills-count` - To receive the report with the number of developers per language

```
{
  "Javascript": 2,
  "PHP": 1,
  "Java": 1
}
```

## Running the tests

The tests files are inside of folders called *__tests__*, to run it you will need to install the dependecies using `npm install` if you have not yet then type `npm run test`, you should see the `jest` output in the terminal

## Authors

* **Marcus Mota** -  [MarcusMota](https://github.com/marcusmota)
