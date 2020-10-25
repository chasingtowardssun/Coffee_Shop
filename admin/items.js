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



    /*Display all items. Requires web based javascript to delete items with AJAX*/

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

    return router;
}();