/* Replace with your SQL commands */
BEGIN;

CREATE TABLE public."categories" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

COMMIT;
