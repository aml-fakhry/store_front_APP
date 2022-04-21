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
