module.exports = function () {
    let express = require('express');
    let router = express.Router();

    function getOrders(res, mysql, context, complete) {
        // mysql.pool.query("SELECT orderID, orderTime, name AS orderName, totalPrice, orderStatus FROM Orders, Users WHERE Orders.userID = Users.userID ORDER BY Orders.orderTime ASC",
        mysql.pool.query("SELECT Item_order.orderID, orderTime, orderStatus, Users.name AS orderName, SUM(Item_order.itemQuanity * Items.unitPrice)  as totalPrice FROM Item_order INNER JOIN Items on Item_order.itemID = Items.itemID INNER JOIN Orders O on Item_order.orderID = O.orderID INNER JOIN Users on O.userID = Users.userID GROUP BY orderID ORDER BY orderTime ASC",
            function (error, results, fields) {
                console.log(error);
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                // console.log(results);

                context.order = results.map(order => {
                    console.log(`Order ==> ${order}`);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                        hour12: false,
                        timeZone: 'America/Los_Angeles'
                    };

                    let d = order.orderTime;
                    let num = order.totalPrice
                    order.orderTime = new Intl.DateTimeFormat('default', options).format(d);
                    order.totalPrice = num.toFixed(2);

                    return order;
                });
                complete();
            });
    }

    function getOrder(res, mysql, context, id, complete) {
        let sql = "SELECT orderID, orderTime, name AS customerName, totalPrice, orderStatus FROM Orders, Users WHERE Orders.userID = Users.userID AND orderID = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results[0];
            complete();
        });
    }

    function getOrderDetails(res, mysql, context, id, complete) {
        let sql = "SELECT Items.name, Item_order.itemQuanity\n" +
            "FROM Item_order INNER JOIN Items on Item_order.itemID = Items.itemID INNER JOIN Orders O on Item_order.orderID = O.orderID\n" +
            "where Item_order.orderID = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
            context.layout = 'other';
            complete();
        });
    }


    // Display all items
    router.get('/:order_id?', function (req, res) {
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["orders.js"];
        let mysql = req.app.get('mysql');

        if (req.params.order_id) {
            getOrderDetails(res, mysql, context, req.params.order_id, complete_json);
        } else {
            getOrders(res, mysql, context, complete);

        }

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('orders', context);
            }
        }

        function complete_json() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('order_detail', context);
            }
        }

    });


    router.put('/:id', function (req, res) {
        let mysql = req.app.get('mysql');
        console.log(req.body);
        console.log(req.params.id);
        // let sql = "UPDATE Orders SET totalPrice=?, orderStatus=? WHERE orderID=?";
        let sql = "UPDATE Orders SET orderStatus=? WHERE orderID=?";
        // let inserts = [req.body.totalPrice, req.body.orderStatus, req.params.id];
        let inserts = [req.body.orderStatus, req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });


    return router;
}();