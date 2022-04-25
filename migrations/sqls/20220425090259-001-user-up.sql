/* Replace with your SQL commands */
-- Table: public.users
-- DROP TABLE public.users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(150) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(120) NOT NULL,
  country VARCHAR(150),
  phone VARCHAR(50)
);
