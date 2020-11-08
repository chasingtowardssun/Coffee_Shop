--
-- Create Tables
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
    orderID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID int(11),
    CONSTRAINT FK_User FOREIGN KEY (userID)
    REFERENCES Users(userID),
    orderTime datetime NOT NULL,
    orderStatus varchar(255) NOT NULL,
    totalPrice float(8) NOT NULL
);

-- Table structure for table `Items`
CREATE TABLE Items(
    itemID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    picURL varchar(255) NOT NULL,
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
    REFERENCES  Items(itemID),
    itemQuanity int(11) NOT NULL
);


--
-- Sample Data
--
-- Change it to the DB's name
use coffee_local;

LOCK TABLES `Users` WRITE;
INSERT INTO Users (name, email, password, phoneNumber)
    VALUES
        ("customer1 Smith", "customer1@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "0123456789"),
        ("customer2 Kate", "customer2@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890"),
        ("customer3 Fox", "customer3@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890"),
        ("customer4 John", "customer4@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890");
UNLOCK TABLES;

INSERT INTO Items (itemID, name, description, picURL, unitPrice) VALUES (1, 'apple', 'fresh apple', 'https://globalassets.starbucks.com/assets/f7febd6b86084135b98a13fa95c72f51.jpg?impolicy=1by1_wide_1242',1.2);
INSERT INTO Items (itemID, name, description, picURL, unitPrice) VALUES (2, 'banana', 'fresh banana', 'https://globalassets.starbucks.com/assets/f7febd6b86084135b98a13fa95c72f51.jpg?impolicy=1by1_wide_1242',1.5);
INSERT INTO Items (itemID, name, description, picURL, unitPrice) VALUES (3, 'Pumpkin Spice Crème', 'description', 'https://globalassets.starbucks.com/assets/f7febd6b86084135b98a13fa95c72f51.jpg?impolicy=1by1_wide_1242', 4.0);
INSERT INTO Items (itemID, name, description, picURL, unitPrice) VALUES (4, 'Caffe Latte', 'description', 'https://globalassets.starbucks.com/assets/f7febd6b86084135b98a13fa95c72f51.jpg?impolicy=1by1_wide_1242', 2.95);
INSERT INTO Items (itemID, name, description, picURL, unitPrice) VALUES (5, 'Flat White', 'description', 'https://globalassets.starbucks.com/assets/f7febd6b86084135b98a13fa95c72f51.jpg?impolicy=1by1_wide_1242', 3.75);

INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (1, 1, '2020-10-16 23:40:22', 'completed', 1.5);
INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (2, 2, '2020-10-16 22:40:56', 'ready for pick up', 1.2);
INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (3, 4, '2020-10-16 21:31:20', 'processing', 2.7);
INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (4, 3, '2020-10-16 21:41:42', 'placed', 3);
INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (5, 1, '2020-10-16 23:56:45', 'placed', 1.2);

INSERT INTO Item_order (itemOrderID, orderID, itemID, itemQuanity) VALUES (1, 1, 2, 1);
INSERT INTO Item_order (itemOrderID, orderID, itemID, itemQuanity) VALUES (2, 2, 1, 1);
INSERT INTO Item_order (itemOrderID, orderID, itemID, itemQuanity) VALUES (3, 3, 1, 1);
INSERT INTO Item_order (itemOrderID, orderID, itemID, itemQuanity) VALUES (4, 3, 2, 1);
INSERT INTO Item_order (itemOrderID, orderID, itemID, itemQuanity) VALUES (5, 4, 2, 2);
INSERT INTO Item_order (itemOrderID, orderID, itemID, itemQuanity) VALUES (6, 5, 1, 1);
