const Joi = require('@hapi/joi');
const { JsonWebTokenError } = require('jsonwebtoken');

// Register Validation
const registerValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        phoneNum: Joi.string().min(8).required(),
        address: Joi.string().required()
    };
    return Joi.validate(data, schema);
}

// Login Validation
const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
}

// Consultation Validation
const consultationValidation = data => {
    const schema = {
        start: Joi.number().required(),
        end: Joi.number().required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.consultationValidation = consultationValidation;