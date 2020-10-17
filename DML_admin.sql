--
-- Test DataBase for admin page
--
-- admin person should be able to perform the following query
-- 0. Show all the items
-- 1. modify an order
--      change order status (placed / processed / ready to pick up / completed)
-- 2. add / delete / edit items
-- 3. show all the orders


-- 0.1 Show all the items
SELECT * FROM Items;

-- 0.1 Show all the Orders --->>  ????
SELECT * FROM Orders;

-- 1.0 modify an order
--      change order status (placed / processed / ready to pick up / completed)
UPDATE Orders set orderStatus = "processed" WHERE orderID = '5';
UPDATE Orders set orderStatus = "ready to pick up" WHERE orderID = '5';

-- 2.0 add an item to Items
INSERT INTO Items (name, unitPrice) VALUES ('Ice Latte', 8.0);
INSERT INTO Items (name, unitPrice) VALUES ('Ice Mocha Latte', 8.0);

-- 2.1 delete an item to Items
DELETE FROM Items where name = 'Ice Mocha Latte';

-- 2.2 update an item (price, name) to Items
UPDATE Items SET unitPrice = 6.0 WHERE name = 'Ice Latte';
commit;
SELECT * FROM Items;

-- 3. show all the orders in the order time
-- 3.1 show the order
SELECT orderID, orderTime, name, totalPrice, orderStatus
FROM Orders, Users
WHERE Orders.userID = Users.userID
ORDER BY Orders.orderTime ASC;

-- 3.2 show the order detailed items
SELECT Items.name, Items.unitPrice, Item_order.itemQuanity
FROM Orders
INNER JOIN Item_order on Orders.orderID = Item_order.orderID
INNER JOIN Items on Item_order.itemID = Items.itemID
WHERE Orders.orderID = 3;



