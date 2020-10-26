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
                res.render('menu', context);
            }
        }
    });


    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO Items (name, unitPrice) VALUES (?,?)";
        let inserts = [req.body.name, req.body.unitPrice];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/menu');
            }
        });
    });

    return router;
}();