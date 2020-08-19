var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var router = express.Router();
var httpStatus = require('http-status');

const { mysqlConfig } = require('../userConfig');
const connection = mysql.createPool(mysqlConfig);

router.all('/forwarding', function (req, res, next) {
    var rawData = {};
    var code = [];
    var name = [];
    var containers = [];
    var product = [];

    connection.getConnection(function (err, connection) {
        let sql = sqlGetWorknoProcedures(req.body.workno);
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (results.length < 1 || results == undefined) {
                console.log('workno not exist')
                res.send(results);
            }
            else {
                sql = sqlProductDetail(req.body.workno);
                connection.query(sql, function (error, results, fields) {
                    product=results;
                    });

                sql = sqlContainerDetail(req.body.workno);
                connection.query(sql, function (error, results, fields) {
                    for (var key in results) {
                        let containerno = parseInt(results[key].containerno, 10);
                        if (containers[containerno] == undefined) {
                            containers.push([containerno, {
                                flowno: parseInt(results[key].flowno, 10),
                                goweight: results[key].goweight,
                                backweight: results[key].backweight
                            }]);
                        }
                        else {
                            containers[containerno].push({
                                flowno: parseInt(results[key].flowno, 10),
                                goweight: results[key].goweight,
                                backweight: results[key].backweight
                            })
                        }
                    }
                    rawData = { containers, code, name, product };
                    res.send(rawData);
                });
                for (i = 1; i <= 14; i++) {
                    if (results[0]["P" + i] != null) {
                        code.push(results[0]["P" + i]);
                        name.push(results[0]["N" + i]);
                    }
                }
            }
        });
    });
});

module.exports = router;

const sqlProductDetail = (workno) => {
    sql = `select (Select Name from codetable x where x.code='1' and x.value=b.producttypecode) ProductType,
    b.spec1, b.spec2,(Select Name from codetable y Where y.code='3' and y.value=b.nutshapecode) nutshape,
    b.size1, b.size2,b.size3
     from purchaseorderitem a, item b 
   where a.itemNo=b.itemNo and a.workno = '${workno}' ;`;
    return sql;
}

const sqlContainerDetail = (workno) => {
    sql = `select containerno, flowno, goweight, backweight
        from containerflow
        where workno = '${workno}'`;
    return sql;
}

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
            where P.workno = '${workno}'`;
    return sql;
}