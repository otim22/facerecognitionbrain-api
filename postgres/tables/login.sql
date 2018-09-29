BEGIN TRANSACTION;

CREATE TABLE login (
    id serial PRIMARY key, 
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
);

COMMIT;