const router = require('express').Router();
const verify = require('../verifyToken');
const mysql = require('mysql');
const con = require('../db');
const util = require('util');

const query = util.promisify(con.query).bind(con);

router.get('/clinics',
async (req, res) => {
    try {
        console.log('get clinics');

        const sql = 'SELECT CLINIC_ID as id, CLINIC_NAME as name FROM CLINIC_INFO';
        const result = await query(sql);
        return res.status(200).send({ list: result });
    } catch(err) {
        return res.status(500).send(err);
    }
})

router.get('/consultation', verify, 
async (req, res) => {
    try {
        console.log(req.email)
        // get clinic id
        const cSql = `SELECT CLINIC_ID AS clinicId FROM USER_INFO WHERE EMAIL=${mysql.escape(req.email)}`;
        const cResult = await query(cSql);
        console.log(cResult)

        const sql = `SELECT CONSULTATION_ID as id, DATE_TIME as dateTime FROM CONSULTATION_INFO WHERE CLINIC_ID=${cResult[0].clinicId};`;
        const result = await query(sql);
        console.log(result[0]);
        return res.status(200).send({ list: result });
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

router.get('/consultation/:id', verify,
async (req, res) => {
    try {
        // Consultation Detail
        const sql = `SELECT * 
                        FROM CONSULTATION_INFO ci
                        LEFT JOIN CLINIC_INFO cli ON ci.CLINIC_ID=cli.CLINIC_ID 
                        LEFT JOIN DOCTOR_INFO di ON ci.DOCTOR_ID=di.DOCTOR_ID 
                        LEFT JOIN PATIENT_INFO pi ON ci.PATIENT_ID=pi.PATIENT_ID
                    WHERE ci.CONSULTATION_ID=${req.params.id}`;
        const result = await query(sql);

        // Diagnosis
        const dSql = `SELECT DIAGNOSIS_NAME
                            FROM CONSULTATION_DIAGNOSIS cd
                            LEFT JOIN DIAGNOSIS_INFO di ON cd.DIAGNOSIS_ID=di.DIAGNOSIS_ID 
                        WHERE cd.CONSULTATION_ID=${req.params.id}`;
        const dResult = await query(dSql);

        // Medication
        const mSql = `SELECT MEDICATION_NAME, UNIT, AMOUNT 
                            FROM CONSULTATION_MEDICATION cm
                            LEFT JOIN MEDICATION_INFO mi ON cm.MEDICATION_ID=mi.MEDICATION_ID
                            LEFT JOIN MEDICATION_UNIT mu ON mi.MEDICATION_UNIT_ID=mu.MEDICATION_UNIT_ID
                        WHERE cm.CONSULTATION_ID=${req.params.id}`;
        const mResult = await query(mSql);

        // Follow up consultation
        const fuSql = `SELECT NEXT_CONSULTATION_ID
                        FROM CONSULTATION_FOLLOW_UP cfu
                        WHERE cfu.CONSULTATION_ID=${req.params.id}`;
        const fuResult = await query(fuSql);
        
        const detail = {
            consultationId: result[0].CONSULTATION_ID,
            clinicName: result[0].CLINIC_NAME,
            doctorName: result[0].DOCTOR_NAME,
            patientName: result[0].PATIENT_NAME,
            dateTime: result[0].DATE_TIME,
            consultationFee: result[0].CONSULTATION_FEE,
            diagnosis: dResult.map(x => x.DIAGNOSIS_NAME) ?? [],
            medication: mResult.map(x => [x.MEDICATION_NAME, x.AMOUNT, x.UNIT]) ?? [],
            followUp: fuResult[0]?.NEXT_CONSULTATION_ID ?? null
        };

        return res.status(200).send(detail);
    } catch(err) {
        console.log(err);
        return res.status(500).send(err);
    }
})

module.exports = router;