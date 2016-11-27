CREATE TABLE dictionary
(
  difficulty integer NOT NULL,
  islenska character varying(32) NOT NULL,
  enska character varying(32) NOT NULL,
  CONSTRAINT dictionary_islenska_key UNIQUE (islenska)
)

CREATE TABLE users
(
  email character varying(32) NOT NULL,
  hash character varying(256),
  level integer NOT NULL,
  score integer NOT NULL,
  CONSTRAINT users_pkey UNIQUE (email)
)