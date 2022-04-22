-- Table: public."orders"
-- DROP TABLE public."orders";
CREATE TABLE public."orders" (
  id SERIAL PRIMARY KEY,
  quantity integer NOT NULL,
  status VARCHAR(15),
  productId bigint REFERENCES products(id),
  userId bigint REFERENCES users(id)
);