-- USER
CREATE TABLE `user` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(600)
);

-- DEAL
CREATE TABLE `deal` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    destination VARCHAR(100),
    fromDate DATE,
    toDate DATE,
    price FLOAT
);

INSERT INTO `deal`(`destination`, `fromDate`, `toDate`, `pricePerDay`)
VALUES ('Bournemouth, England, United Kingdom of Great Britain and Northern Ireland','2024-06-01','2024-07-05', 41.99)