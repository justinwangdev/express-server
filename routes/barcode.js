var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const { response } = require('express');
const { text } = require('body-parser');
var router = express.Router();

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
    fetch('../sqls/sample.sql')
        .then(response => response.text())
        .then(text => res.send(text))
});

module.exports = router;