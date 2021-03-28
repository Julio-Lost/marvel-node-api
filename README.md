# Marvel Node Api

The project consists of an api rest that will allow the registration of users, management of users, favorite comics and characters.

- Access here: https://marvel-node-api.herokuapp.com
<br>

## Functionalities

The description of the routes is available at the link: [Swagger](https://marvel-node-api.herokuapp.com/api-docs/)

<br>

## Technologies used

- [Docker](https://www.docker.com/)
- [Jest](https://github.com/facebook/jest)
- [TypeORM](https://github.com/typeorm/typeorm#readme)
- [Postgres](https://github.com/postgres/postgres)
- [Nodejs](https://nodejs.org/en/)
- [Express](https://github.com/expressjs/express)
- [Sqlite3](https://github.com/mapbox/node-sqlite3)

<br>

## Running the application in a development environment

- Clone this repository with the command: <br>git clone https://github.com/Julio-Lost/marvel-node-api.

- Have NPM or Yarn, Docker and Nodejs installed.

- Create a container in the Docker with command: <br> `docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=somePassword -d postgres`.

- Create a database with the name `stone`

- Install the project dependencies with the command: <br> `npm install` or `yarn`.

- After installing the dependencies and created container, execute the command ( This command will create the tables in the database ): <br> `yarn run-scheme:dev` ou `npm run run-scheme:dev`.

- After synchronizing the database, start the server with the command: <br> `npm run dev` or `yarn dev`.

- To run the tests(integration and unit), run the command: <br> `npm run test` or `yarn test`.
