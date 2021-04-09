const router = require('express').Router();
const verify = require('../verifyToken');
const mysql = require('mysql');
const con = require('../db');
const util = require('util');

const query = util.promisify(con.query).bind(con);

router.get('/personalinfo', verify, 
async (req,res) => {
    try {
        var sql = 'SELECT * FROM REGISTERED_USER WHERE USER_NAME = ' + mysql.escape(req.username);
        const result  = await query(sql);
        console.log(result[0]);
        const user = {
            username: result[0].USER_NAME,
            fname: result[0].FNAME,
            sname: result[0].SNAME,
            email: result[0].EMAIL,
            phoneNum: result[0].PHONE_NO,
            creditCard: result[0].CREDIT_CARD
        };
        return res.status(200).send(user);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
    
});

module.exports = router;