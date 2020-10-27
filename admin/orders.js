module.exports = function(){
    let express = require('express');
    let router = express.Router();

    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT orderID, orderTime, name AS orderName, totalPrice, orderStatus FROM Orders, Users WHERE Orders.userID = Users.userID ORDER BY Orders.orderTime ASC",
            function(error, results, fields){
            console.log(error);
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.order = results;
            complete();
        });
    }

    function getOrder(res, mysql, context, id, complete){
        let sql = "SELECT orderID, orderTime, name AS customerName, totalPrice, orderStatus FROM Orders, Users WHERE Orders.userID = Users.userID AND orderID = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results[0];
            complete();
        });
    }


    // Display all items
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orders', context);
            }
        }
    });


    // Display one order
    router.get('/:id', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["updateorder.js"];
        let mysql = req.app.get('mysql');
        getOrder(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-order', context);
            }

        }
    });


    router.put('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        console.log(req.body);
        console.log(req.params.id);
        let sql = "UPDATE Orders SET totalPrice=?, orderStatus=? WHERE orderID=?";
        let inserts = [req.body.totalPrice, req.body.orderStatus, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });


    return router;
}();