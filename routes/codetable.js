var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();

const connection = mysql.createPool({
    host: '192.168.1.123',
    user: 'justin',
    password: '22563952',
    database: 'mhs'
});

router.get('/', function(req, res, next) {
    // Connecting to the database.
    connection.getConnection(function(err, connection) {

        // Executing the MySQL query (select all data from the 'users' table).
        connection.query("select Name, Value from codetable where Code='H' and Tag='0YY' order by Value;", function(error, results, fields) {
            // If some error occurs, we throw an error.
            if (error) throw error;

            // Getting the 'response' from the database and sending it to our route. This is were the data is.
            res.send(results)
        });
    });
});

router.post('/test', function(req, res, next) {
    console.log(req.body);
});

module.exports = router;