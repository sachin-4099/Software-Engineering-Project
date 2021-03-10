create table userdb(
	userid SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255),
	lockingperiod INTEGER,
	upi VARCHAR(255) NOT NULL,
	phone_number BIGINT NOT NULL,
	category_percentage TEXT []
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
	paid_to BIGINT,
	paid_to_type CHARACTER,
	transaction_at DATE,
	status_id INTEGER,
	FOREIGN KEY(paid_by) REFERENCES userdb(username),
	FOREIGN KEY(category_id) REFERENCES category(id),
	FOREIGN KEY(status_id) REFERENCES transaction_status(status_id)
);

CREATE TABLE queries (
	userid BIGINT PRIMARY KEY,
	transaction_id BIGINT,
	FOREIGN KEY (userid) REFERENCES userdb(userid),
	FOREIGN KEY (transaction_id) REFERENCES transaction(id),
	query_msg varchar(255)
);

CREATE TABLE merchants (
	merchant_id SERIAL PRIMARY KEY,
	merchant_name varchar(255),
	account_id varchar(255)
);

CREATE TABLE coupons (
	couponid SERIAL PRIMARY KEY,
	merchant_id INTEGER,
	FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id),
	discount INT,
	coupon_code VARCHAR(255),
	created_at DATE,
	expired_at DATE
);
