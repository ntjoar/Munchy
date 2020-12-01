const joi = require('@hapi/joi')

//Register validation
const registerValidation = (data) =>{
    const validationSchema = joi.object().keys({
        firstName: joi.string().min(3).max(128).trim().required(),
        lastName: joi.string().min(3).max(128).trim().required(),
        email: joi.string().min(6).max(254).lowercase().trim().required().email(),
        password: joi.string().min(8).trim().required(),
        passwordConfirmation:joi.valid(joi.ref('password')),

    });
    return validationSchema.validate(data, {abortEarly:false})
}

//Login validation
const loginValidation = (data) =>{
    const validationSchema = joi.object().keys({
        
        email: joi.string().min(8).max(254).lowercase().trim().required().email(),
        password: joi.string().min(8).trim().required(),
       // _csrf : joi.string()      
    });
    return validationSchema.validate(data, {abortEarly:false})
}
module.exports.registerValidation =registerValidation;
module.exports.loginValidation =loginValidation;