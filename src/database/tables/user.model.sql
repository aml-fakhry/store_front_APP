-- Table: public.users
-- DROP TABLE public.users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(150),
  email VARCHAR(50),
  password VARCHAR(120),
  country VARCHAR(150),
  phone VARCHAR(50)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  price integer NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(15),
  user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity integer,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES products(id)
);

SELECT
  *
FROM
  products
ORDER BY
  price DESC;

SELECT
  *
FROM
  products
  INNER JOIN order_products ON product.id = order_products.id;

SELECT
  *
FROM
  products
  INNER JOIN order_products ON product.id = order_products.id;
