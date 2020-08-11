var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();

const {mysqlConfig} = require ('../userConfig');
const connection = mysql.createPool(mysqlConfig);

router.get('/codetable', function (req, res, next) {
    sql = sqlCodeTable;
    connection.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.send(results)
        });
    })
});

router.all('/inserting', function (req, res, next) {
    connection.getConnection(function (err, connection) {
        var sql = sqlChecking(req.body.workno, req.body.containerno, req.body.procedureCode);
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (results.length < 1 || results == undefined)
                sql = sqlInsert(req.body.weight, req.body.workno, req.body.containerno, req.body.procedureCode);
            else
                sql = sqlUpdate(req.body.weight, req.body.workno, req.body.containerno, req.body.procedureCode);
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
            });
            res.send(results);
        });
    });
});

module.exports = router;

const sqlUpdate = (weight, workno, containerno, procedureCode) => {
    var sql = `UPDATE containerflow SET goweight='` + weight +
        "\' where flowno=\'" + procedureCode + "\' and workno=\'" +
        workno + "\' and containerno=\'" + containerno + "\';";
    return sql;
}

const sqlInsert = (weight, workno, containerno, procedureCode) => {
    var sql = `Insert into containerflow (workno, containerno, flowno, goweight) values('` +
        workno + "\', \'" + containerno + "\', " + procedureCode + ", \'" + weight + "\')";
    return sql;
}

const sqlChecking = (workno, containerno, procedureCode) => {
    var sql = `select containerflow.workno, codetable.name, \
    containerflow.containerno, containerflow.goweight \
    from containerflow, codetable where codetable.value = \
    containerflow.flowno and codetable.code = 'H'`+
        " and containerflow.workno = \'" + workno +
        "\' and containerflow.containerno = \'" + containerno +
        "\' and codetable.value = \'" + procedureCode + "\'";
    return sql;
}

const sqlCodeTable = `select Name as label, Value as value from\
         codetable where Code = 'H' and Tag = '0YY' order by Value;`;