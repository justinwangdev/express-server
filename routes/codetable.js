var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();

const { mysqlConfig } = require('../userConfig');
const connection = mysql.createPool(mysqlConfig);

router.get('/', function (req, res, next) {
    sql = sqlGetCodeTable;
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(results)
            connection.release();
        });
    })
});

module.exports = router;

const sqlGetCodeTable =
    `select Name as label, Value as value 
    from codetable 
    where Code = 'H' 
    and Tag = '0YY' 
    order by Value;`;