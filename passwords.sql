CREATE DATABASE passwords;
DROP TABLE IF EXISTS passwords;
CREATE TABLE passwords(
    password_id SERIAL PRIMARY KEY,
    website VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password TEXT NOT NULL UNIQUE
);
DROP TABLE IF EXISTS prev_passwords;
CREATE TABLE prev_passwords(
    prev_password_id SERIAL PRIMARY KEY,
    password_id INT NOT NULL REFERENCES passwords(password_id) ON DELETE SET NULL,
    password TEXT NOT NULL
);
select website, email, prev_passwords.password 
from passwords 
full join prev_passwords on passwords.password_id = prev_passwords.password_id 
where email='reed';