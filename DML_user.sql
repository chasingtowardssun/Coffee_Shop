--
-- Test DataBase for user page
--
-- A user should be able to perform the following queries
-- 0. Login by email
-- 1. Register
-- 2. Change user account info
--      Change user profile (name, phone number / password)
--
-- 3. ...
-- 4. ...

-- 0. Login by email
SELECT * FROM Users WHERE email = "customer1@gmail.com";

-- 1. Register
INSERT INTO Users (name, email, password)
  VALUES ("customer1 Smith", "customer1@gmail.com",
    "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S");

-- 2.0 Update user name phoneNumber from Users
UPDATE Users SET name="customer1 Eric", phoneNumber="1234567890" WHERE userID= 1;

-- 2.1 Update user password from Users
UPDATE Users
  SET password = "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S"
  WHERE userID=1;
