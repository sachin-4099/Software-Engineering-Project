create table userdb(
	userid SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255),
	lockingperiod INTEGER,
	upi VARCHAR(255) NOT NULL,
	phone_number BIGINT NOT NULL UNIQUE,
);

create table admindb(
	userid SERIAL PRIMARY KEY,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255),
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
);

create table category_percentage(
	userid INTEGER,
	category_id INTEGER,
	category_percentage INTEGER,
	FOREIGN KEY(userid) REFERENCES userdb(userid),
	FOREIGN KEY(category_id) REFERENCES category(id)
);

create table category(
	id INTEGER PRIMARY KEY,
	name VARCHAR(255),
	description VARCHAR(255)
);

create table transaction_status(
	status_id INTEGER PRIMARY KEY,
	status VARCHAR(255)
);

create table transaction(
	id BIGINT PRIMARY KEY,
	paid_by VARCHAR(255),
	total_amt INT,
	currency VARCHAR(255),
	category_id INTEGER,
	amount_saved INTEGER,
	paid_to INTEGER,
	paid_to_type CHARACTER,
	transaction_at DATE,
	status_id INTEGER,
	FOREIGN KEY(paid_by) REFERENCES userdb(username),
	FOREIGN KEY(category_id) REFERENCES category(id),
	FOREIGN KEY(status_id) REFERENCES transaction_status(status_id)
);

CREATE TABLE queries (
	userid INTEGER,
	transaction_id BIGINT,
	FOREIGN KEY (userid) REFERENCES userdb(userid),
	FOREIGN KEY (transaction_id) REFERENCES transaction(id),
	query_msg VARCHAR(255)
);

CREATE TABLE merchants (
	merchant_id SERIAL PRIMARY KEY,
	merchant_name VARCHAR(255),
	account_id VARCHAR(255)
);

CREATE TABLE coupons (
	couponid SERIAL PRIMARY KEY,
	merchant_id INTEGER,
	FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id),
	discount INT,
	coupon_code VARCHAR(255),
	coupon_desc VARCHAR(255),
	coupon_type VARCHAR(255),
	created_at DATE,
	expired_at DATE
);
