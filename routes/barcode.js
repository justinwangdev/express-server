var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();
const fetch = require("node-fetch");

const connection = mysql.createPool({
    host: '192.168.1.123',
    user: 'justin',
    password: '22563952',
    database: 'mhs'
});

router.get('/codetable', function(req, res, next) {
    connection.getConnection(function(err, connection) {
        connection.query("select Name, Value from codetable where Code='H' and Tag='0YY' order by Value;", function(error, results, fields) {
            if (error) throw error;
            res.send(results)
        });
    });
});

router.all('/test', function(req, res, next) {
    var where = "where ";
    fetch('http://192.168.1.123:3000/sample.sql')
        .then(response => response.text())
        .then(text => {
            var sql = text;
            connection.getConnection(function(err, connection) {
                connection.query(sql, function(error, results, fields) {
                    if (error) throw error;
                    res.send(results)
                });
            });
        });

});

module.exports = router;