# Vacinas Server

## Description

Backend server application for the Vacinas project. [PostgreSQL](https://www.postgresql.org/about/) database managed by [typeORM](https://typeorm.io/#/) runs on a [docker](https://www.docker.com/) container. **Docker-compose won't run on Windows OS!** Preferrably, run this software on an Unix-based OS.

## Environment and tools

- Typescript
- nodeJS
- typeORM
- docker
- PostgreSQL

Dev Tools:

- [ESLint](https://www.npmjs.com/package/eslint)
- [Prettier](https://www.npmjs.com/package/prettier)

## Steps to run and debug

In order to run this project, **first** check if you have **nodeJS** properly installed on your machine by typing `node -v` into a terminal. `nvm use` ensures you are using the correct NodeJS version. Also make sure your **docker** instalation is OK by typing `docker -v`.

1. Clone the project. `git clone <repo uri>`
2. Install the dependencies. `yarn`
3. Update `.env` files
4. Run `docker-compose up -d` on the root folder to start the container in detached mode.
5. Type `yarn dev` to run the server. Auto-reload is on (with ts-node-dev).

To perform the tests, run `yarn test`


## Usable files:
.env file
```
#
# Base
# ----
PORT=3000

#
# Database Url
# ------------
# local
DATABASE_URL='postgres://admin:admin@localhost:5432/localdb'

#
# Node env
# --------
NODE_ENV='development'
```

.env.test file
```
#
# Base
# ----
DATABASE_URL='postgres://admin:admin@localhost:5433/testdb'
PORT=3001

#
# Node env
# --------
NODE_ENV='test'
```
