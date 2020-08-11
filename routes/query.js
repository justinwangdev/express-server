var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();
var httpStatus = require('http-status');

const { mysqlConfig } = require('../userConfig');
const connection = mysql.createPool(mysqlConfig);

router.all('/forwarding', function (req, res, next) {
    var names = [];
    var values = [];
    sql = sqlGetWorknoProcedures(req.body.workno);
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        if (results.length < 1 || results == undefined)
            console.log('workno not exist')
        else {
            for (i = 1; i <= 14; i++) {
                if (results[0]["P" + i] != null) {
                    values.push(results[0]["P" + i]);
                    names.push(results[0]["N" + i]);
                }
            }
            data={names, values};
            res.send(data);
        }
    });
});

module.exports = router;

const sqlGetWorknoProcedures = (workno) => {
    sql = `select P.Processing1 P1,   (Select name from codetable where code='H' and value= P.Processing1 )as N1,
                P.Processing2 P2,   (Select name from codetable where code='H' and value= P.Processing2 )as N2,
                P.Processing3 P3,	(Select name from codetable where code='H' and value= P.Processing3 )as N3,
                P.Processing4 P4,	(Select name from codetable where code='H' and value= P.Processing4 )as N4,
                P.Processing5 P5,	(Select name from codetable where code='H' and value= P.Processing5 )as N5,
                P.Processing6 P6,	(Select name from codetable where code='H' and value= P.Processing6 )as N6,
                P.Processing7 P7,	(Select name from codetable where code='H' and value= P.Processing7 )as N7,
                P.Processing8 P8,	(Select name from codetable where code='H' and value= P.Processing8 )as N8,
                P.Processing9 P9,	(Select name from codetable where code='H' and value= P.Processing9 )as N9,
                P.Processing10 P10, (Select name from codetable where code='H' and value= P.Processing10 )as N10,
                P.Processing11 P11, (Select name from codetable where code='H' and value= P.Processing11 )as N11,
                P.Processing12 P12, (Select name from codetable where code='H' and value= P.Processing12 )as N12,
                P.Processing13 P13, (Select name from codetable where code='H' and value= P.Processing13 )as N13,
                P.Processing14 P14, (Select name from codetable where code='H' and value= P.Processing14 )as N14
            from purchaseorderitem P
            where P.workno = '` + workno + '\'';
    return sql;
}