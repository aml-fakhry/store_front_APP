-- Table: public."products"
-- DROP TABLE public."products";
CREATE TABLE public."products" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  price integer NOT NULL,
  category_id bigint REFERENCES categories(id)
);
