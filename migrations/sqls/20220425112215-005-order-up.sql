/* Replace with your SQL commands */
BEGIN;

CREATE TABLE public."orders" (
  id SERIAL PRIMARY KEY,
  quantity integer NOT NULL,
  status VARCHAR(15),
  product_id bigint REFERENCES products(id),
  user_id bigint REFERENCES users(id)
);

COMMIT;
