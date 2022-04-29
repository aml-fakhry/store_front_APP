/* Replace with your SQL commands */
BEGIN;

CREATE TABLE public."order_products" (
  id SERIAL PRIMARY KEY,
  quantity integer NOT NULL,
  order_id bigint REFERENCES orders(id) NOT NULL,
  product_id bigint REFERENCES products(id) NOT NULL
);

COMMIT;
