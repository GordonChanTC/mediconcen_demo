const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        clinicId: Joi.number().required(),
        phoneNum: Joi.string().min(8).required(),
        address: Joi.string().required()
    };
    return Joi.validate(data, schema);
}

const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;