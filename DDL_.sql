--
-- 1. Create Tables
--
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Users`;
SET FOREIGN_KEY_CHECKS = 1;


-- Table structure for table `Users`
CREATE TABLE Users(
    userID int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    phoneNumber varchar(255)
);




--
-- 2. Sample Data
--

LOCK TABLES `User` WRITE;
INSERT INTO Users (name, email, password, phoneNumber)
    VALUES
        ("customer1", "customer1@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "0123456789"),
        ("customer2", "customer2@gmail.com", "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S", "1234567890");
UNLOCK TABLES;


