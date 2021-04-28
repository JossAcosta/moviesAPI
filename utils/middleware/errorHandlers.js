const boom= require('@hapi/boom');
const { config } = require('../../config');


function withErrorStack(error, stack) {
    if(config.dev){
        return {... error, stack }
    }
    return error;
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }
    next(err);
}

function errorHandler(err, req, res, next){
    const { output: { stausCode, payload }} = err;

    res.status(stausCode);
    res.json(withErrorStack(payload, err.stack));
}

function logErrors(err, req, res, next){
    console.log(err);
    next(err);
}

function errorHandler(err, req, res, next){
    res.status(err.status || 500);
    res.json(withErrorStack(err.message, err.stack));
}

module.exports = { 
    logErrors,
    wrapErrors,
    errorHandler
};