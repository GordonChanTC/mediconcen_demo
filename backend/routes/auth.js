const router = require('express').Router();
const { registerValidation, loginValidation } = require('../validation');
const mysql = require('mysql');
const con = require('../db');
const util = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const query = util.promisify(con.query).bind(con);

router.post('/register', 
async (req,res) => {

    //input validation
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send({'message': error.details[0].message});

    //Check if email exist
    try {
        var sql = 'SELECT COUNT(*) AS Amount FROM USER_INFO WHERE EMAIL = ' + mysql.escape(req.body.email);
        const result = await query(sql);
        console.log(result[0].Amount);
        if(result[0].Amount > 0) {
            return res.status(400).send({"field": "email", "message": "Account already exist"});
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //Create new user
    const user = {
        EMAIL: req.body.email,
        ENCRYPTED_PASSWORD: hashedPassword,
        PHONE_NO: req.body.phoneNum,
        CLINIC_ID: req.body.clinicId,
        ADDRESS: req.body.address
    };

    try {
        var sql = 'INSERT INTO USER_INFO SET ?';
        const result = await query(sql, user);
        return res.status(200).send(req.body);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }


});



router.post('/login', 
async (req,res) => {
    console.log(req);

    //input validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send({'message': error.details[0].message});

    //Check if username exist
    try {
        var sql = 'SELECT COUNT(*) AS Amount FROM USER_INFO WHERE EMAIL = ' + mysql.escape(req.body.email);
        const result  = await query(sql);
        console.log(result[0].Amount);
        if(result[0].Amount == 0) {
            return res.status(400).send({"message": "Username not correct!"});
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }

    //Find the password from database
    try {
        var sql = 'SELECT * FROM USER_INFO WHERE EMAIL = ' + mysql.escape(req.body.email);
        const result  = await query(sql);
        console.log(result[0].ENCRYPTED_PASSWORD);
        //Check password
        const validPass = await bcrypt.compare(req.body.password, result[0].ENCRYPTED_PASSWORD);
        if(!validPass) {
            return res.status(400).send({"message": "Password not correct!"});
        }else{
            //Create and assign a token
            const token = jwt.sign({sub: result[0].EMAIL, Roles: "ROLE_USER", exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)}, process.env.JWT_SECRET);
            res.header('Authorization', "Bearer "+ token);
            return res.status(200).send({ "message": "Logged in!", "verified": true });
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }

});


module.exports = router;
