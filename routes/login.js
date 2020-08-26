var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();
var httpStatus = require('http-status');

const {mysqlConfig} = require ('../userConfig');
const connection = mysql.createPool(mysqlConfig);

router.post('/', function (req, res, next) {
    sql = sqlLoggingIn(req.body.username.value);
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (!(results.length < 1 || results == undefined)) {
                if (results[0].userPassword == req.body.password.value) {
                    res.send({ matching: true, ID: results[0].EmployeeID });
                }
                else {
                    res.status(httpStatus.NOT_FOUND).send({
                        matching: false,
                        type: "password"
                    });
                }
            }
            else {
                res.status(httpStatus.NOT_FOUND).send({
                    matching: false,
                    type: "userName"
                });
            }
        });
    });
});

module.exports = router;

const sqlLoggingIn = (userName) => {
    sql = `select userPassword, EmployeeID from userinfo 
        where userinfo.userName = '${userName}';`;
    return sql;
}