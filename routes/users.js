var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();
var httpStatus = require('http-status');

const {mysqlConfig} = require ('../userConfig');
const connection = mysql.createPool(mysqlConfig);

router.all('/name', function (req, res, next) {
    sql = sqlGetEmployeeName(req.body.userToken);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            else {
                res.send(results);
            }
        });
    });
});

module.exports = router;

const sqlGetEmployeeName = (EmployeeID) => {
    sql = `select EmployeeName from userinfo 
        where userinfo.EmployeeID = '${EmployeeID}';`;
    return sql;
}