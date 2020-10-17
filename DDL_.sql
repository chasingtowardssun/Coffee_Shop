--
-- 1. Create Tables
--
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `Items`;
DROP TABLE IF EXISTS `Item_order`;
SET FOREIGN_KEY_CHECKS = 1;


-- Table structure for table `Users`
CREATE TABLE Users(
    userID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    phoneNumber varchar(255)
);

-- Table structure for table `Orders`
CREATE TABLE Orders(
    orderID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    orderTime time NOT NULL,
    orderStatus bool NOT NULL,
    totalPrice float(8) NOT NULL
);

-- Table structure for table `Items`
CREATE TABLE Items(
    itemID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    name varchar(255) NOT NULL,
    unitPrice float(8) NOT NULL
);

-- Table structure for table `Item_order`
CREATE TABLE Item_order(
    itemOrderID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    orderID int(11),
    CONSTRAINT FK_ItemOrder FOREIGN KEY (orderID)
    REFERENCES Orders(orderID),
    itemID int(11),
    CONSTRAINT FK_Item FOREIGN KEY (itemID)
    REFERENCES  Items(itemID)
);


--
-- 2. Sample Data
--

LOCK TABLES `Users` WRITE;
INSERT INTO Users (name, email, password, phoneNumber)
    VALUES
        ("customer1", "customer1@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "0123456789"),
        ("customer2", "customer2@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890");
UNLOCK TABLES;


