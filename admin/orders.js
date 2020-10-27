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

    return router;
}();