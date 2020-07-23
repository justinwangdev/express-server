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
    fetch('http://192.168.1.123:3000/codetable.sql')
        .then(response => response.text())
        .then(text => {
            sql = text;
            connection.getConnection(function(err, connection) {
                connection.query(sql, function(error, results, fields) {
                    if (error) throw error;
                    res.send(results)
                });
            });
        })
});

router.all('/checking', function(req, res, next) {
    fetch('http://192.168.1.123:3000/checkProcedure.sql')
        .then(response => response.text())
        .then(text => {
            var sql = text;
            var where = "\n and containerflow.workno = \'";
            var tmp = req.body.workno;
            where = where.concat(tmp);
            where = where.concat("\'\n and containerflow.containerno = \'");
            tmp = req.body.containerno;
            where = where.concat(tmp);
            where = where.concat("\'\n and codetable.value = \'");
            tmp = req.body.procedureCode;
            where = where.concat(tmp);
            where = where.concat("\'");
            sql = sql.concat(where);
            console.log(sql);
            connection.getConnection(function(err, connection) {
                connection.query(sql, function(error, results, fields) {
                    if (error) throw error;
                    res.send(results)
                });
            });
        });
});

router.all('/inserting', function(req, res, next) {
    fetch('http://192.168.1.123:3000/sendInsertion.sql')
        .then(response => response.text())
        .then(text => {
            var sql = text;
            var values = req.body.workno;
            values = values.concat("\', \'");
            values = values.concat(req.body.containerno);
            values = values.concat("\', ");
            values = values.concat(req.body.procedureCode);
            values = values.concat(", \'");
            values = values.concat(req.body.weight);
            values = values.concat("\')");
            sql = sql.concat(values);
            connection.getConnection(function(err, connection) {
                connection.query(sql, function(error, results, fields) {
                    if (error) throw error;
                    res.send(results)
                });
            });
        });
});

router.all('/updating', function(req, res, next) {
    fetch('http://192.168.1.123:3000/sendUpdate.sql')
        .then(response => response.text())
        .then(text => {
            var sql = text;
            var values = req.body.weight;
            values = values.concat("\', flowno=\'");
            values = values.concat(req.body.procedureCode);
            values = values.concat("\'\n where workno=\'");
            values = values.concat(req.body.workno);
            values = values.concat("\' and containerno=\'");
            values = values.concat(req.body.containerno);
            values = values.concat("\';")
            sql = sql.concat(values);
            connection.getConnection(function(err, connection) {
                connection.query(sql, function(error, results, fields) {
                    if (error) throw error;
                    res.send(results)
                });
            });
        });
});

module.exports = router;