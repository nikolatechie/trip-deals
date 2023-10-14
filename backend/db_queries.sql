-- USER
CREATE TABLE `user` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(600),
    role VARCHAR(10)
);

-- DEAL
CREATE TABLE `deal` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    destination VARCHAR(100),
    from_date DATE,
    to_date DATE,
    price_per_day FLOAT
);

INSERT INTO `deal`(`destination`, `from_date`, `to_date`, `price_per_day`)
VALUES ('Bournemouth, England, United Kingdom of Great Britain and Northern Ireland','2024-06-01','2024-07-05', 41.99)

-- CONTACT
CREATE TABLE `contact` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(50),
	email VARCHAR(80),
    message VARCHAR(1000)
);

INSERT INTO `contact`(`subject`, `email`, `message`)
VALUES ('Test subject', 'grujic.nikola.22@sinergija.ba', 'Test message field. Test message field. Test message field.')

-- ARTICLE
CREATE TABLE `article` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(400) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    url VARCHAR(400) NOT NULL,
    creator VARCHAR(200) NOT NULL,
    pub_date VARCHAR(20) NOT NULL,
    img_name VARCHAR(50) NOT NULL
);

-- BOOKING
CREATE TABLE booking (
    id INT NOT NULL AUTO_INCREMENT,
    deal_id INT,
    adults INT,
    children INT,
    total_cost FLOAT,
    from_date DATE,
    to_date DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (deal_id) REFERENCES deal(id)
);
