# Luxor Coding Challenge
[Requirements](./docs/README.md)

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
ENVIRONMENT=DEV
API_URL=http://api:3001
API_PORT=3001

DOCKER_REGISTRY=localhost

DB_TYPE=postgres
DB_HOST=db
DB_USERNAME=[desired username]
DB_PASSWORD=[desired password]
DB_NAME=luxor_challenge
DB_PORT=5432

TESTING_DB_HOST=testing_db
TESTING_DB_NAME=luxor_challenge_testing
TESTING_DB_PORT=5432
```

## Scripts

* `api_shell.sh` - opens shell for the api container to run commands
* `clean_dist.sh` - deletes all existing `/dist/` directories for fresh builds from SWC and TypeScript
* `db_shell.sh` - opens the shell for the main database to run commands
* `start_api_test.sh` - docker compose command to build and run the testing containers
* `start_dev.sh` - docker compose command to build and start the development server
* `test_api.sh` - drops all database tables so TypeORM can repopulate updated entities and runs Jest tests from `api/src/__tests__/`
* `test_db_shell.sh` - opens the shell for the testing database to run commands
* `clean_environment.sh` - prunes all docker containers/volumes/images, removes database data directories and TypeScript build directories

## Start Up

- Make sure you have the following technologies installed
    - Docker - [Desktop](https://www.docker.com/products/docker-desktop/) | [CLI / Linux](https://docs.docker.com/engine/install/ubuntu/)
    - [Bun](https://bun.sh/docs/installation)
    - Node.js (check `/api/.nvmrc` for Node version)
- Create a `.env` file in the root of the project
- `cd` into `/api` and run `bun install`
- Run the `start_dev.sh` script in the `/scripts/` directory

## Testing

- While the api docker container is running
    * run the `test_api.sh` script inside the `/scripts/` directory
- Using `override.test.yml` docker compose file
    * run the `start_api_test.sh` script inside the `/scripts/` directory


## Technologies Used

- Docker
- Bun
- TypeScript
- SWC
- Jest
- Supertest
- PostgreSQL