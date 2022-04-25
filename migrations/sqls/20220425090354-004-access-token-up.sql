/* Replace with your SQL commands */
-- Table: public.accessTokens
-- DROP TABLE public."accessTokens";
CREATE TABLE public."accessTokens" (
  id character(36) COLLATE pg_catalog."default" NOT NULL,
  "issuedAt" timestamp with time zone NOT NULL,
  "expiresAt" timestamp with time zone NOT NULL,
  "userId" integer NOT NULL,
  CONSTRAINT "accessTokens_pkey" PRIMARY KEY (id),
  CONSTRAINT "accessTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
