--
-- 2. Sample Data
--
-- Change it to the DB's name
use coffee_local;

LOCK TABLES `Users` WRITE;
INSERT INTO Users (name, email, password, phoneNumber)
    VALUES
        ("customer1", "customer1@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "0123456789"),
        ("customer2", "customer2@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890"),
        ("customer3", "customer3@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890"),
        ("customer4", "customer4@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890");
UNLOCK TABLES;

INSERT INTO Items (itemID, name, unitPrice) VALUES (1, 'apple', 1.2);
INSERT INTO Items (itemID, name, unitPrice) VALUES (2, 'banana', 1.5);

INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (1, 1, '2020-10-16 23:40:22', 'completed', 1.5);
INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (2, 2, '2020-10-16 22:40:56', 'ready for pick up', 1.2);
INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (3, 4, '2020-10-16 21:31:20', 'processing', 2.7);
INSERT INTO Orders (orderID, userID, orderTime, orderStatus, totalPrice) VALUES (4, 3, '2020-10-16 21:41:42', 'placed', 3);