-- CREATE DATABASE
CREATE DATABASE FINANCE;

-- Create Tables

CREATE TABLE FINANCE.Card (
    id INT  AUTO_INCREMENT PRIMARY KEY,
	card_type VARCHAR(255) NOT NULL ,
	card_number VARCHAR(500) UNIQUE NOT NULL ,
	expiration_month VARCHAR(255) NOT NULL ,
	expiration_year VARCHAR(255) NOT NULL ,
	cvv VARCHAR(255) NOT NULL ,
	card_funds DOUBLE NOT NULL ,
	name VARCHAR(255) NOT NULL
);


