CREATE DATABASE passwords;
DROP TABLE IF EXISTS passwords;
CREATE TABLE passwords(
    password_id SERIAL PRIMARY KEY,
    website VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password TEXT NOT NULL UNIQUE
);