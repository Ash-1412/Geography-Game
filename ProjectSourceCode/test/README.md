# Lab 10 Test Setup

## Setup

1. From `ProjectSourceCode/`, copy `.env.test.example` to `.env.test` and fill in the values. `POSTGRES_DB` must end in `_test`.
2. Install dependencies into the test container:

```bash
docker compose -p lab10-tests -f docker-compose.test.yaml run --rm --no-deps tests npm ci
```

3. Run the tests:

```bash
docker compose -p lab10-tests -f docker-compose.test.yaml up --abort-on-container-exit --exit-code-from tests
```

4. Shut down (keeps volumes):

```bash
docker compose -p lab10-tests -f docker-compose.test.yaml down
```

5. Reset the test database and dependencies (deletes test volumes only):

```bash
docker compose -p lab10-tests -f docker-compose.test.yaml down --volumes
```

## Route Contract: POST /register

| Item             | Contract                                             |
| ---------------- | ---------------------------------------------------- |
| Endpoint         | `POST /register`                                     |
| Request          | JSON containing `username` and `password`            |
| Valid username   | A nonempty string                                    |
| Valid password   | A string of at least 8 characters                    |
| Success          | `201` and `{"message":"Registration successful"}`    |
| Invalid input    | `400` and `{"message":"Invalid input"}`              |
| Server error     | `500` and `{"message":"Server error"}`               |
| Persistence      | One row in `users` with columns `username` and `password`; `user_id` is auto-generated; `password` stores a bcrypt hash |

## Tests

- `test/validation.spec.js`: unit tests for `src/validateRegistration.js` (no HTTP, no database).
- `test/server.spec.js`: API integration tests for `GET /welcome` and `POST /register` (positive: valid input; negative: missing password).

## Cleanup Behavior

- Tests run against a separate `db-test` container. `src/db.js` refuses to run in test mode unless the database name ends in `_test`.
- Each run generates a unique username (`lab10_<uuid>`).
- `beforeEach` and `afterEach` delete only that username from `users`. The table is never truncated.
- A root `after` hook closes the database pool with `pgp.end()`.
- The suite passes repeatedly without manual database changes.