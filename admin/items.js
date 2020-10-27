module.exports = function(){
    let express = require('express');
    let router = express.Router();

    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT itemID, name AS itemName, unitPrice FROM Items", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.item = results;
            complete();
        });
    }


    function getItem(res, mysql, context, id, complete){
        let sql = "SELECT itemID as id, name AS itemName, unitPrice FROM Items WHERE itemID = ?";
        let inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results[0];
            complete();
        });
    }


    // Display all items.
    router.get('/', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["deleteitem.js"];
        let mysql = req.app.get('mysql');
        getItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('items', context);
            }
        }
    });


    router.post('/', function(req, res){
        console.log('POST');
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO Items (name, unitPrice) VALUES (?,?)";
        let inserts = [req.body.name, req.body.unitPrice];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/items');
            }
        });
    });

    // Display one item for the specific purpose of updating one item
    router.get('/:id', function(req, res){
        let callbackCount = 0;
        let context = {};
        context.jsscripts = ["updateitem.js"];
        let mysql = req.app.get('mysql');
        getItem(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-item', context);
            }

        }
    });

    router.put('/:id', function(req, res){
        let mysql = req.app.get('mysql');
        console.log(req.body);
        console.log(req.params.id);
        let sql = "UPDATE items SET name=?, unitPrice=? WHERE itemID=?";
        let inserts = [req.body.itemName, req.body.unitPrice, req.params.id];
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