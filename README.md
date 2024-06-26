# Luxor Coding Challenge
[Requirements](./docs/README.md)

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
ENVIRONMENT=DEV
API_URL=http://api:3001
API_PORT=3001

DOCKER_REGISTRY=localhost

TOKEN_SECRET=[desired string]

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

#### Seed the Database

- In a separate terminal window, navigate back to the `./scripts` directory
- Run the script `./api_shell.sh`
- Inside the api container shell, run the command `bun seed`

#### Run the Next.js Client

- `cd` into the `./client` directory
- Run `bun install`
- Run `bun dev`

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
- Redux
- Next.js

## Challenge Questions

1. How would you monitor the application to ensure it is running smoothly?
    * I would use technologies like Sentry, alongside user analytics platforms like PostHog
2. How would you address scalability and performance?
    * I haven't come across any major performance or scalability problems in my projects thus far, but technologies like Kubernetes can help with scalability.
3. Trade-offs you had to choose when doing this challenge (the things you would do different with more time and resources)
    * With more time, I would love to implement tools like redux and redux thunk. I'd also want to ensure code quality via testing using either Jest or Cypress.