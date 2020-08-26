var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();

const { mysqlConfig } = require('../userConfig');
const connection = mysql.createPool(mysqlConfig);

router.post('/', function (req, res, next) {
    connection.getConnection(function (err, connection) {
        var sql = sqlGetWeightContainerFlow(req.body.workno, req.body.containerno, req.body.procedureCode);
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (results.length < 1 || results == undefined)
                sql = sqlInsertContainerFlow(req.body.weight, req.body.workno, req.body.containerno, req.body.procedureCode);
            else
                sql = sqlUpdateContainerFlow(req.body.weight, req.body.workno, req.body.containerno, req.body.procedureCode);
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
            });
            res.send(results);
            connection.release();
        });
    });
});

module.exports = router;

const sqlUpdateContainerFlow = (weight, workno, containerno, procedureCode) => {
    var sql = `UPDATE containerflow SET goweight='${weight}'
                where flowno='${procedureCode}' 
                    and workno='${workno}'
                    and containerno='${containerno}';`;
    return sql;
}

const sqlInsertContainerFlow = (weight, workno, containerno, procedureCode) => {
    var sql = `Insert into containerflow 
        (workno, containerno, flowno, goweight) 
        values('${workno}', '${containerno}', '${procedureCode}', '${weight}');`;
    return sql;
}

const sqlGetWeightContainerFlow = (workno, containerno, procedureCode) => {
    var sql = `select containerflow.workno, codetable.name, containerflow.containerno, containerflow.goweight
        from containerflow, codetable 
        where codetable.value = containerflow.flowno and codetable.code = 'H'
        and containerflow.workno = '${workno}'
        and containerflow.containerno = '${containerno}'
        and codetable.value = '${procedureCode}';`;
    return sql;
}
