module.exports = function () {
    let express = require('express');
    let router = express.Router();

    function getItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT name, unitPrice, calorie, description, picURL FROM Items", function (error, results, fields) {
            if (error) {
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
        var callbackCount = 0;
        var context = {};
        let mysql = req.app.get('mysql');
        getItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('menu/Menu', context);
            }
        }
    });

    // app.get('/menu/Menu', (req, res) => {
//   var context = {};
//   context.name = "Cappuccino"
//   context.price = "$2.99"
//   context.calorie = "200 Cal per serving"
//   context.photo = "https://globalassets.starbucks.com/assets/5c515339667943ce84dc56effdf5fc1b.jpg?impolicy=1by1_wide_1242"
//   res.render('menu/Menu', context)
// })


    return router;
}();
